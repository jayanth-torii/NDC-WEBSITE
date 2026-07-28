import { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import { MdTitle, MdTextFormat, MdDescription, MdImage, MdDelete, MdPerson, MdPhone, MdAdd, MdSave } from "react-icons/md";
import { FaUsers, FaBuilding, FaCalendarAlt, FaTrophy } from "react-icons/fa";
import { getIic, updateIic } from "../services/data.service";
import Swal from "sweetalert2";
import { triggerUpload } from "./AboutNdcPage";

export function IicPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLoading(true);
    getIic()
      .then((res) => setData(res?.data ?? {}))
      .catch((err) => {
        Swal.fire("Error", err.message, "error");
      })
      .finally(() => setLoading(false));
  }, []);

  const banner = data?.BannerSection ?? {};
  const members = data?.IICMembers ?? {};
  const table: any[] = members.MembersTable ?? [];

  function updateBannerField(field: "eyebrow" | "title" | "subtitle" | "image", value: string) {
    setData((prev: any) => ({ ...prev, BannerSection: { ...(prev?.BannerSection ?? {}), [field]: value } }));
  }

  function updateMembersField(field: string, value: any) {
    setData((prev: any) => ({ ...prev, IICMembers: { ...(prev?.IICMembers ?? {}), [field]: value } }));
  }

  function updateMemberRow(i: number, field: string, value: string) {
    const next = table.map((row, idx) => (idx === i ? { ...row, [field]: value } : row));
    updateMembersField("MembersTable", next);
  }

  function addMemberRow() {
    updateMembersField("MembersTable", [...table, { name: "New Member", designation: "Member", role: "Description...", contact: "" }]);
  }

  function removeMemberRow(i: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this member? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#F6872A",
      cancelButtonColor: "#0e2455",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        updateMembersField(
          "MembersTable",
          table.filter((_, idx) => idx !== i)
        );
      }
    });
  }

  async function handleSave() {
    setSaving(true);
    try {
      await updateIic(data);
      Swal.fire({
        title: "Saved Successfully",
        icon: "success",
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
      });
    } catch (err: any) {
      Swal.fire("Error", err.response?.data?.message || err.message, "error");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner size="xl" color="#F6872A" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 font-['Poppins',sans-serif] -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pt-8">
      
      {/* Max Width Container to prevent ultra-wide stretching */}
      <div className="max-w-[1400px] mx-auto w-full">

        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 bg-white p-6 rounded-[24px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] border border-gray-100">
            <div>
                <div className="flex items-center gap-3 mb-1">
                    <div className="w-2 h-2 rounded-full bg-[#F6872A] animate-pulse"></div>
                    <span className="text-[#F6872A] text-[11px] font-bold tracking-[0.2em] uppercase">MANAGE PUBLIC PAGE</span>
                </div>
                <h1 className="text-3xl font-black text-[#0e2455] tracking-tight">IIC Configuration</h1>
            </div>
            <button 
                onClick={handleSave}
                disabled={saving}
                className="group relative overflow-hidden bg-gradient-to-r from-[#F6872A] to-[#f89c4d] text-white px-8 py-3.5 rounded-2xl font-bold shadow-[0_8px_20px_rgba(246,135,42,0.25)] hover:shadow-[0_12px_25px_rgba(246,135,42,0.4)] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-[0_8px_20px_rgba(246,135,42,0.25)]"
            >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                {saving ? (
                    <Spinner size="sm" color="white" />
                ) : (
                    <MdSave size={20} className="relative z-10" />
                )}
                <span className="relative z-10 tracking-wide">{saving ? "Saving..." : "Save Changes"}</span>
            </button>
        </div>

        {/* Banner Section Card */}
        <div className="bg-white rounded-[32px] shadow-[0_8px_30px_-4px_rgba(0,0,0,0.04)] border border-gray-100 p-8 lg:p-10 mb-12 overflow-hidden relative">
          
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#F6872A] to-[#ffb677]"></div>
          
          <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#F6872A] flex items-center justify-center border border-orange-100/50 shadow-inner">
                <MdImage size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-[#0e2455]">Banner Management</h2>
                <p className="text-sm text-gray-500 font-medium mt-0.5">Customize the hero section of the IIC page.</p>
              </div>
          </div>

          <div className="flex flex-col xl:flex-row gap-12">
            {/* Form Fields (Left) */}
            <div className="flex-1 flex flex-col gap-6 w-full xl:max-w-[500px]">
              
              {/* Eyebrow */}
              <div className="group/input relative">
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 pl-1">Eyebrow Text</label>
                <div className="flex items-center border border-gray-200 rounded-2xl overflow-hidden focus-within:border-[#F6872A]/50 focus-within:ring-4 focus-within:ring-[#F6872A]/10 transition-all bg-gray-50/50 hover:bg-gray-50">
                  <div className="pl-5 pr-3 text-gray-400 group-focus-within/input:text-[#F6872A] transition-colors">
                    <MdTitle size={20} />
                  </div>
                  <input 
                    type="text" 
                    value={banner.eyebrow ?? ""}
                    onChange={(e) => updateBannerField("eyebrow", e.target.value)}
                    className="w-full bg-transparent py-4 pr-5 outline-none text-sm font-bold text-[#0e2455] placeholder:font-medium placeholder:text-gray-400"
                    placeholder="E.g., Industry Partnerships"
                  />
                </div>
              </div>

              {/* Title */}
              <div className="group/input relative">
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 pl-1">Main Title</label>
                <div className="flex items-center border border-gray-200 rounded-2xl overflow-hidden focus-within:border-[#F6872A]/50 focus-within:ring-4 focus-within:ring-[#F6872A]/10 transition-all bg-gray-50/50 hover:bg-gray-50">
                  <div className="pl-5 pr-3 text-gray-400 group-focus-within/input:text-[#F6872A] transition-colors">
                    <MdTextFormat size={22} />
                  </div>
                  <input 
                    type="text" 
                    value={banner.title ?? ""}
                    onChange={(e) => updateBannerField("title", e.target.value)}
                    className="w-full bg-transparent py-4 pr-5 outline-none text-sm font-bold text-[#0e2455] placeholder:font-medium placeholder:text-gray-400"
                    placeholder="E.g., IIC"
                  />
                </div>
              </div>

              {/* Subtitle */}
              <div className="group/input relative">
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 pl-1">Subtitle / Description</label>
                <div className="flex border border-gray-200 rounded-2xl overflow-hidden focus-within:border-[#F6872A]/50 focus-within:ring-4 focus-within:ring-[#F6872A]/10 transition-all bg-gray-50/50 hover:bg-gray-50">
                  <div className="pl-5 pr-3 pt-5 text-gray-400 group-focus-within/input:text-[#F6872A] transition-colors">
                    <MdDescription size={20} />
                  </div>
                  <textarea 
                    value={banner.subtitle ?? ""}
                    onChange={(e) => updateBannerField("subtitle", e.target.value)}
                    rows={3}
                    className="w-full bg-transparent py-4 pr-5 outline-none text-sm font-medium text-gray-600 resize-none leading-relaxed placeholder:text-gray-400"
                    placeholder="Brief description about the cell..."
                  />
                </div>
              </div>

              {/* Image URL Editor */}
              <div className="group/input relative flex flex-col justify-center border border-gray-200 rounded-2xl p-4 bg-gray-50/50 hover:bg-gray-50 transition-all">
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 pl-1">Background Image URL</label>
                <div className="flex items-center gap-3">
                  <button 
                    type="button" 
                    onClick={() => triggerUpload((url) => updateBannerField("image", url))}
                    className="px-4 py-2 bg-[#F6872A] text-white text-xs font-bold rounded-xl hover:bg-[#e0751f] transition-colors shadow-md"
                  >
                    {banner.image ? "Change Image" : "Upload Image"}
                  </button>
                  {banner.image && (
                    <button 
                      type="button"
                      onClick={() => updateBannerField("image", "")}
                      className="px-4 py-2 bg-red-50 text-red-600 text-xs font-bold rounded-xl hover:bg-red-100 transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Banner Preview (Right) */}
            <div className="flex-[1.5] flex flex-col pt-2 xl:pt-0">
              <div className="flex items-center justify-between mb-3">
                  <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Live Preview</span>
                  <span className="text-[10px] font-semibold text-[#F6872A] bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100">Real-time</span>
              </div>
              <div className="relative w-full h-[360px] rounded-[24px] overflow-hidden bg-[#0e2455] flex items-center shadow-[0_20px_40px_-10px_rgba(14,36,85,0.25)] border border-gray-200 group/preview">
                  
                  {banner.image ? (
                      <img src={banner.image} alt="Banner Preview" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay group-hover/preview:scale-105 transition-transform duration-700 ease-out" />
                  ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-white/10 text-xl font-black tracking-widest uppercase">NO IMAGE</div>
                  )}
                  
                  {/* Refined Decorative Slants */}
                  <div className="absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-[#0e2455] via-[#0e2455]/95 to-[#142d59]/90 backdrop-blur-sm shadow-[20px_0_40px_rgba(0,0,0,0.6)] z-10" style={{ clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)" }}></div>
                  <div className="absolute inset-y-0 left-0 w-[61%] bg-gradient-to-b from-[#F6872A] to-[#e0751f] z-0" style={{ clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)" }}></div>

                  <div className="relative z-20 p-12 flex flex-col justify-center h-full w-full max-w-[65%]">
                      <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-5 w-fit">
                        <p className="text-[#fca059] text-[10px] font-black tracking-[0.2em] uppercase drop-shadow-sm">{banner.eyebrow || "NAGARJUNA DEGREE COLLEGE"}</p>
                      </div>
                      <h3 className="text-white font-black text-5xl leading-[1.1] mb-5 drop-shadow-lg tracking-tight">{banner.title || "IIC"}</h3>
                      <p className="text-gray-200 text-sm font-medium leading-relaxed drop-shadow-md line-clamp-3 opacity-95 border-l-2 border-[#F6872A] pl-4">{banner.subtitle || "Bridging the gap between academia and industry."}</p>
                  </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Stats Bar */}
        <div className="bg-[#0e2455] rounded-[32px] shadow-[0_20px_40px_-12px_rgba(14,36,85,0.3)] p-1 flex flex-col lg:flex-row justify-between items-stretch mb-14 text-white relative overflow-hidden group/stats">
            
            {/* Ambient Glows */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#F6872A] rounded-full blur-[140px] opacity-20 pointer-events-none group-hover/stats:opacity-30 transition-opacity duration-700"></div>
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500 rounded-full blur-[140px] opacity-20 pointer-events-none group-hover/stats:opacity-30 transition-opacity duration-700"></div>

            <div className="flex-1 flex flex-col sm:flex-row">
                {/* Stat 1 */}
                <div className="flex-1 flex items-center justify-center sm:justify-start gap-5 p-8 relative z-10 group/stat">
                    <div className="w-16 h-16 rounded-[20px] bg-gradient-to-br from-[#f87171] to-[#dc2626] flex items-center justify-center text-white shadow-lg shadow-red-500/25 group-hover/stat:scale-110 group-hover/stat:-rotate-3 transition-transform duration-300">
                        <FaUsers size={26} />
                    </div>
                    <div>
                        <div className="text-4xl font-black leading-none mb-2 tracking-tight">{table.length.toString().padStart(2, '0')}</div>
                        <div className="text-[11px] leading-snug uppercase tracking-[0.2em] text-blue-200 font-bold opacity-80">Total<br/>Members</div>
                    </div>
                </div>
                
                <div className="hidden sm:block w-px bg-gradient-to-b from-transparent via-white/10 to-transparent my-6"></div>
                
                {/* Stat 2 */}
                <div className="flex-1 flex items-center justify-center sm:justify-start gap-5 p-8 relative z-10 group/stat">
                    <div className="w-16 h-16 rounded-[20px] bg-gradient-to-br from-[#60a5fa] to-[#2563eb] flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover/stat:scale-110 group-hover/stat:rotate-3 transition-transform duration-300">
                        <FaBuilding size={24} />
                    </div>
                    <div>
                        <div className="text-4xl font-black leading-none mb-2 tracking-tight">01</div>
                        <div className="text-[11px] leading-snug uppercase tracking-[0.2em] text-blue-200 font-bold opacity-80">Active<br/>Section</div>
                    </div>
                </div>
            </div>

            <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-white/10 to-transparent my-6"></div>

            <div className="flex-1 flex flex-col sm:flex-row">
                {/* Stat 3 */}
                <div className="flex-1 flex items-center justify-center sm:justify-start gap-5 p-8 relative z-10 group/stat">
                    <div className="w-16 h-16 rounded-[20px] bg-gradient-to-br from-[#c084fc] to-[#7e22ce] flex items-center justify-center text-white shadow-lg shadow-purple-500/25 group-hover/stat:scale-110 group-hover/stat:-rotate-3 transition-transform duration-300">
                        <FaCalendarAlt size={24} />
                    </div>
                    <div>
                        <div className="text-4xl font-black leading-none mb-2 tracking-tight">10+</div>
                        <div className="text-[11px] leading-snug uppercase tracking-[0.2em] text-blue-200 font-bold opacity-80">Events<br/>Organized</div>
                    </div>
                </div>
                
                <div className="hidden sm:block w-px bg-gradient-to-b from-transparent via-white/10 to-transparent my-6"></div>
                
                {/* Stat 4 */}
                <div className="flex-1 flex items-center justify-center sm:justify-start gap-5 p-8 relative z-10 group/stat">
                    <div className="w-16 h-16 rounded-[20px] bg-gradient-to-br from-[#34d399] to-[#059669] flex items-center justify-center text-white shadow-lg shadow-emerald-500/25 group-hover/stat:scale-110 group-hover/stat:rotate-3 transition-transform duration-300">
                        <FaTrophy size={24} />
                    </div>
                    <div>
                        <div className="text-4xl font-black leading-none mb-2 tracking-tight">100+</div>
                        <div className="text-[11px] leading-snug uppercase tracking-[0.2em] text-blue-200 font-bold opacity-80">Students<br/>Impacted</div>
                    </div>
                </div>
            </div>
        </div>

        {/* Team Members Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4 bg-white p-6 rounded-[24px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] border border-gray-100">
            <div>
                <h2 className="text-2xl font-black text-[#0e2455] tracking-tight">Team Directory</h2>
                <p className="text-sm text-gray-500 font-medium mt-1.5">Manage IIC council members and their contact details.</p>
            </div>
            <button 
                onClick={addMemberRow}
                className="group flex items-center gap-2.5 px-6 py-3 bg-[#0e2455] text-white rounded-2xl text-sm font-bold shadow-[0_8px_20px_rgba(14,36,85,0.2)] hover:bg-[#15347a] hover:shadow-[0_12px_25px_rgba(14,36,85,0.3)] hover:-translate-y-0.5 transition-all duration-300"
            >
                <MdAdd size={20} className="group-hover:rotate-90 transition-transform duration-300" /> 
                <span>Add Member</span>
            </button>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
            {table.map((row, i) => (
                <div key={i} className="bg-white rounded-[32px] shadow-[0_8px_30px_-4px_rgba(0,0,0,0.04)] border border-gray-100 p-7 relative flex flex-col group/card hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] hover:-translate-y-1 hover:border-[#F6872A]/30 transition-all duration-500">
                    
                    {/* Delete button */}
                    <button 
                        onClick={() => removeMemberRow(i)}
                        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-all duration-300 hover:bg-red-500 hover:text-white shadow-sm hover:shadow-md hover:scale-110 z-10"
                        title="Remove Member"
                    >
                        <MdDelete size={20} />
                    </button>

                    <div className="flex items-center gap-5 mb-7">
                        <div className="w-16 h-16 rounded-[22px] bg-gradient-to-br from-orange-50 to-orange-100/50 text-[#F6872A] flex items-center justify-center shrink-0 border border-orange-200/50 shadow-inner group-hover/card:scale-105 group-hover/card:-rotate-3 transition-transform duration-500">
                            <MdPerson size={32} />
                        </div>
                        <div className="flex-1 min-w-0 pr-12">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Full Name</label>
                            <input 
                                value={row.name ?? ""}
                                onChange={(e) => updateMemberRow(i, "name", e.target.value)}
                                className="font-black text-[#0e2455] text-xl outline-none w-full border-b-2 border-transparent focus:border-[#F6872A] pb-1 truncate bg-transparent transition-colors placeholder:text-gray-300"
                                placeholder="Enter member's name"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-5">
                        <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100 focus-within:border-[#F6872A]/40 focus-within:ring-4 focus-within:ring-[#F6872A]/10 focus-within:bg-white transition-all group/input">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block group-focus-within/input:text-[#F6872A] transition-colors">Designation</label>
                            <input 
                                value={row.designation ?? ""}
                                onChange={(e) => updateMemberRow(i, "designation", e.target.value)}
                                className="w-full bg-transparent text-sm font-bold text-gray-800 outline-none placeholder:font-medium placeholder:text-gray-400"
                                placeholder="e.g., MEMBER"
                            />
                        </div>
                        
                        <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100 focus-within:border-[#F6872A]/40 focus-within:ring-4 focus-within:ring-[#F6872A]/10 focus-within:bg-white transition-all group/input">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5 group-focus-within/input:text-[#F6872A] transition-colors">
                                <MdPhone size={14} /> Contact
                            </label>
                            <input 
                                value={row.contact ?? ""}
                                onChange={(e) => updateMemberRow(i, "contact", e.target.value)}
                                className="w-full bg-transparent text-sm font-bold text-gray-800 outline-none placeholder:font-medium placeholder:text-gray-400"
                                placeholder="Phone number"
                            />
                        </div>
                    </div>
                    
                    <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100 focus-within:border-[#F6872A]/40 focus-within:ring-4 focus-within:ring-[#F6872A]/10 focus-within:bg-white transition-all flex-1 flex flex-col group/input">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block group-focus-within/input:text-[#F6872A] transition-colors">Role / Description</label>
                        <textarea 
                            value={row.role ?? ""}
                            onChange={(e) => updateMemberRow(i, "role", e.target.value)}
                            className="w-full bg-transparent text-sm font-medium text-gray-600 outline-none resize-none flex-1 leading-relaxed min-h-[80px] placeholder:text-gray-400"
                            placeholder="Brief description of their role in the council..."
                        />
                    </div>
                </div>
            ))}
        </div>

      </div>
    </div>
  );
}
