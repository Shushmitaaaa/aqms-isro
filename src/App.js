import React, { useState, useEffect } from 'react';
import { Wind, Droplets, Gauge, Activity, AlertTriangle, TrendingUp, TrendingDown, MapPin, Calendar, ChevronDown } from 'lucide-react';

const AQMSDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedParam, setSelectedParam] = useState('aqi');
  const [showAllPollutants, setShowAllPollutants] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const aqiData = {
    current: 99,
    status: 'Moderate',
    color: 'from-emerald-400 to-teal-500',
    textColor: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    trend: 'up'
  };

  const parameters = [
    { name: 'Temperature', value: '30°C', icon: Gauge, color: 'text-rose-500', trend: '+2°' },
    { name: 'Humidity', value: '72%', icon: Droplets, color: 'text-sky-500', trend: '-3%' },
    { name: 'Pressure', value: '1015 hPa', icon: Wind, color: 'text-violet-500', trend: '+5' },
    { name: 'VOC Levels', value: '0.39 ppm', icon: Activity, color: 'text-amber-500', trend: '-0.05' }
  ];

  const pollutants = [
    { name: 'PM2.5', value: 64.5, unit: 'µg/m³', limit: 60, status: 'warning' },
    { name: 'PM10', value: 85.0, unit: 'µg/m³', limit: 100, status: 'moderate' },
    { name: 'O₃', value: 88, unit: 'µg/m³', limit: 100, status: 'good' },
    { name: 'NO₂', value: 114.7, unit: 'µg/m³', limit: 80, status: 'warning' },
    { name: 'SO₂', value: 12.3, unit: 'µg/m³', limit: 20, status: 'good' },
    { name: 'CO', value: 0.8, unit: 'mg/m³', limit: 2, status: 'good' }
  ];

  const chartData = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    value: 85 + Math.sin(i * 0.5) * 15 + Math.random() * 10
  }));

  const getStatusColor = (status) => {
    const colors = {
      good: 'bg-green-500',
      moderate: 'bg-yellow-500',
      warning: 'bg-orange-500',
      unhealthy: 'bg-red-500'
    };
    return colors[status] || colors.moderate;
  };

  const displayedPollutants = showAllPollutants ? pollutants : pollutants.slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50 to-teal-50 text-gray-900 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Air Quality Monitoring
              </h1>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 text-xs sm:text-sm text-gray-600">
                <div className="flex items-center gap-1 sm:gap-2">
                  <MapPin size={14} className="sm:w-4 sm:h-4" />
                  <span>Bangalore, Karnataka</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <Calendar size={14} className="sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">{currentTime.toLocaleDateString()}</span>
                  <span className="sm:hidden">{currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
                <span className="font-mono text-xs">{currentTime.toLocaleTimeString()}</span>
              </div>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <button className="px-3 py-2 sm:px-4 text-sm bg-white hover:bg-gray-50 rounded-lg border border-gray-200 transition-all shadow-sm">
                Reports
              </button>
              <button className="px-3 py-2 sm:px-4 text-sm bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:shadow-lg hover:shadow-emerald-500/30 transition-all">
                Live Map
              </button>
            </div>
          </div>
        </div>

        {/* Main AQI Card */}
        <div className="mb-6 sm:mb-8 animate-slide-up">
          <div className="relative overflow-hidden bg-white rounded-2xl sm:rounded-3xl border border-gray-200 p-4 sm:p-8 shadow-xl">
            <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full blur-3xl"></div>
            
            <div className="relative space-y-4 sm:space-y-6">
              {/* AQI Display and Status */}
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="relative flex-shrink-0">
                  <div className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br ${aqiData.color} flex items-center justify-center shadow-lg shadow-emerald-500/30`}>
                    <div className="text-center text-white">
                      <div className="text-3xl sm:text-4xl font-bold">{aqiData.current}</div>
                      <div className="text-xs uppercase tracking-wider">AQI</div>
                    </div>
                  </div>
                  {aqiData.trend === 'up' ? (
                    <TrendingUp className="absolute -bottom-2 -right-2 text-red-500 bg-white rounded-full p-1 shadow-md" size={20} />
                  ) : (
                    <TrendingDown className="absolute -bottom-2 -right-2 text-green-500 bg-white rounded-full p-1 shadow-md" size={20} />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-1 text-gray-900">{aqiData.status}</h2>
                  <p className="text-sm sm:text-base text-gray-600 mb-3">Air quality is acceptable for most individuals</p>
                  <div className="flex flex-wrap gap-2">
                    <div className="px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200">
                      <span className="text-xs sm:text-sm font-semibold text-amber-700">Moderate Concern</span>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
                      <span className="text-xs sm:text-sm font-semibold text-emerald-700">Auto-refresh ON</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Health Advisory - Full Width Below */}
              <div className="flex items-start gap-3 sm:gap-4 bg-amber-50 rounded-xl p-4 border border-amber-200">
                <AlertTriangle className="text-amber-600 flex-shrink-0 mt-0.5" size={24} />
                <div className="flex-1 min-w-0">
                  <div className="text-xs sm:text-sm text-gray-600 font-medium mb-1">Health Advisory</div>
                  <div className="text-sm sm:text-base font-semibold text-gray-900">Sensitive groups should reduce prolonged outdoor exertion</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Environmental Parameters Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          {parameters.map((param, index) => (
            <div
              key={index}
              className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between items-start mb-3 sm:mb-4">
                <param.icon className={param.color} size={24} />
                <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-0.5 sm:py-1 rounded">{param.trend}</span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold mb-1 text-gray-900">{param.value}</div>
              <div className="text-xs sm:text-sm text-gray-600">{param.name}</div>
            </div>
          ))}
        </div>

        {/* Pollutants Grid */}
        <div className="mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">Pollutant Levels</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {displayedPollutants.map((pollutant, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 hover:shadow-md transition-all"
              >
                <div className="text-xs text-gray-600 mb-2 font-medium">{pollutant.name}</div>
                <div className="text-xl sm:text-2xl font-bold mb-2 text-gray-900">{pollutant.value}</div>
                <div className="text-xs text-gray-500 mb-3">{pollutant.unit}</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className={`h-2 rounded-full ${getStatusColor(pollutant.status)}`}
                    style={{ width: `${Math.min((pollutant.value / pollutant.limit) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500">Limit: {pollutant.limit}</div>
              </div>
            ))}
          </div>
          
          {pollutants.length > 4 && (
            <button 
              onClick={() => setShowAllPollutants(!showAllPollutants)}
              className="mt-4 w-full sm:w-auto mx-auto flex items-center justify-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 transition-all text-sm font-medium text-gray-700"
            >
              {showAllPollutants ? 'Show Less' : 'Show All Pollutants'}
              <ChevronDown className={`transition-transform ${showAllPollutants ? 'rotate-180' : ''}`} size={16} />
            </button>
          )}
        </div>

        {/* Trend Chart */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">24-Hour Trend</h3>
            <div className="flex flex-wrap gap-2">
              {['AQI', 'PM2.5', 'PM10', 'NO₂'].map((param) => (
                <button
                  key={param}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm transition-all ${
                    selectedParam === param.toLowerCase()
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedParam(param.toLowerCase())}
                >
                  {param}
                </button>
              ))}
            </div>
          </div>
          
          <div className="relative h-48 sm:h-64">
            <svg className="w-full h-full">
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {[0, 25, 50, 75, 100].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={`${y}%`}
                  x2="100%"
                  y2={`${y}%`}
                  stroke="rgb(209, 213, 219)"
                  strokeWidth="1"
                  strokeDasharray="4"
                  opacity="0.5"
                />
              ))}
              
              <polyline
                points={chartData
                  .map((d, i) => `${(i / (chartData.length - 1)) * 100}%,${100 - (d.value / 120) * 100}%`)
                  .join(' ')}
                fill="url(#chartGradient)"
                stroke="rgb(16, 185, 129)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            
            <div className="flex justify-between mt-3 sm:mt-4 text-xs text-gray-600">
              {['00:00', '06:00', '12:00', '18:00', '23:59'].map((time, i) => (
                <span key={i} className="hidden sm:inline">{time}</span>
              ))}
              {['00', '06', '12', '18', '24'].map((time, i) => (
                <span key={i} className="sm:hidden">{time}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 sm:mt-8 text-center text-gray-600 text-xs sm:text-sm">
          <p>Data updated every 5 minutes • Last: {currentTime.toLocaleTimeString()}</p>
          <p className="mt-2">Powered by ISRO AQMS • Indian Space Research Organisation</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AQMSDashboard;