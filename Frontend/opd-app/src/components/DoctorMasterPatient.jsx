import React, { useState, useContext, useEffect } from 'react';
import { SidebarContext } from '../contexts/Sidebar';
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Clock, 
  Stethoscope, 
  CalendarCheck,
  IndianRupee,
  ThumbsUp,
  Award
} from 'lucide-react';

const DoctorMasterPatient = () => {
  const { expanded } = useContext(SidebarContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchFromBack = async () => {
      try {
        const fetchedData = await fetch('http://localhost:3000/api/doctors', { credentials: 'include' });
        const jsonData = await fetchedData.json();
        setDoctors(jsonData);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchFromBack();
  }, []);

  const specialties = ["All", "Cardiologist", "Dermatologist", "Pediatrician", "Gynecologist", "Orthopedic"];

  const filteredDoctors = doctors.filter(doc => {
    const nameMatch = doc.DoctorName?.toLowerCase().includes(searchTerm.toLowerCase());
    // Checking description or hospital if available in the populated object
    const extraMatch = doc.Description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSearch = nameMatch || extraMatch;
    
    // Note: If you don't have a 'specialty' field in your schema, 
    // you might want to filter by 'Description' or add a specialty field to your Mongoose model.
    const matchesSpecialty = selectedSpecialty === 'All' || doc.Description?.includes(selectedSpecialty);
    
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className={`min-h-screen bg-gray-50 text-slate-800 font-sans p-8 ${expanded ? "ml-64" : "ml-16"} transition-all duration-1000`}>
      
      {/* --- Header Section --- */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Book an Appointment</h1>
        <p className="text-slate-500 mt-2">Connect with expert doctors and manage your health efficiently.</p>
        
        <div className="mt-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search doctor name or description..." 
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl font-medium text-slate-700 hover:bg-gray-50 transition-all shadow-sm">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* --- Doctor Cards Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <div 
            key={doctor.DoctorID} 
            className="group bg-white rounded-2xl border border-blue-50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
          >
            {/* Card Header */}
            <div className="p-6 pb-4 flex gap-4">
              <div className="relative">
                <img 
                  src={doctor.Image || 'https://via.placeholder.com/150'} 
                  alt={doctor.DoctorName} 
                  className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md"
                />
                {doctor.Rating >= 4.5 && (
                  <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1 rounded-full border-2 border-white">
                    <ThumbsUp className="w-3 h-3" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                  {doctor.DoctorName}
                </h3>
                <p className="text-sm font-medium text-blue-600 mt-1 line-clamp-1">{doctor.Description}</p>
                
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded border border-yellow-100">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-bold text-slate-700">{doctor.Rating || 'N/A'}</span>
                  </div>
                  <span className="text-xs text-slate-400">Professional Rating</span>
                </div>
              </div>
            </div>

            <div className="h-px bg-gray-100 mx-6"></div>

            {/* Card Body */}
            <div className="p-6 pt-4 flex-1">
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3 text-slate-600">
                  <MapPin className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                  {/* Assumes HospitalID is populated or you're showing the ID */}
                  <span className="line-clamp-1">Hospital ID: {doctor.HospitalID}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Award className="h-4 w-4 text-slate-400" />
                  <span>{doctor.Experience} Years Experience</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Clock className="h-4 w-4 text-slate-400" />
                  <span>{doctor.AvgTimePerPatient} mins per patient</span>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="bg-blue-50/50 p-4 border-t border-blue-100 flex items-center justify-between gap-3">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Availability</span>
                <div className="flex items-center gap-1 text-xs font-semibold text-green-700 mt-0.5">
                  <CalendarCheck className="w-3 h-3" />
                  {doctor.SlotsPerDay} Slots Daily
                </div>
              </div>
              
              <button 
                onClick={() => console.log(`Booking ID: ${doctor.DoctorID}`)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-sm transition-all"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorMasterPatient;