// @ts-nocheck
import React, { useEffect, useState } from "react";
import classnames from 'classnames';
import { getPage, putPage } from '../services/data.service';
import './about-ndc.scss';

import { publicPathForRoute } from '../config/publicPathMap';
import { triggerRevalidate } from '../services/revalidate';
import { uploadImage } from '../services/data.service';

import Swal from "sweetalert2";

const getPreviewUrl = (url: string) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${import.meta.env.VITE_API_URL || 'http://localhost:5001'}${url}`;
};

export const triggerUpload = (callback: (url: string) => void) => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*,application/pdf,video/*';
  input.onchange = async (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const res = await uploadImage(file);
        if (res?.data?.url) callback(res.data.url);
      } catch (err) {
        console.error("Upload failed", err);
      }
    }
  };
  input.click();
};

const ImagePreviewControl = ({ label, value, onChange }) => {
  return (
    <div className="mb-3">
      <label className="themed-label">{label}</label>
      <div className="flex gap-2">
        {value && (
          <div className="image-preview" style={{width: '50px', height: '50px', flexShrink: 0, borderRadius: '6px', overflow: 'hidden', border: '1px solid #e0e5fa', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', fontSize: '10px', color: '#64748b', textAlign: 'center'}}>
             {value.toLowerCase().match(/\.(mp4|webm|ogg)(\?.*)?$/) ? "Video attached" : value.toLowerCase().match(/\.pdf(\?.*)?$/) ? "PDF attached" : <img src={getPreviewUrl(value)} style={{width: '100%', height: '100%', objectFit: 'cover'}} alt="preview" />}
          </div>
        )}
        <div style={{flex: 1, display: 'flex', alignItems: 'center', gap: '8px'}}>
          <button type="button" className="btn btn-sm" style={{background: '#f5f7fc', border: '1px solid #e0e5fa', fontSize: '11px', padding: '6px 12px', color: '#1a1a1a', borderRadius: '4px'}} onClick={() => triggerUpload(onChange)}>
            {value ? "Change File" : "Upload File"}
          </button>
          {value && (
            <button type="button" className="btn btn-sm" style={{background: '#fee2e2', border: '1px solid #fca5a5', fontSize: '11px', padding: '6px 12px', color: '#dc2626', borderRadius: '4px'}} onClick={() => onChange("")}>
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export function AboutNdcPage() {
  const [activeTab, setActiveTab] = useState("1");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const [formData, setFormData] = useState({
    aboutUs: { title: "", image: "", description: [] },
    VisionMission: { dropdowns: [] },
    principalMessage: { title: "", principalName: "", position: "", image: "", message: [] },
    NewsLetter: { title: "", sections: [] },
    OurCampuses: { title: "", campuses: [] },
    GoverningCouncilMembers: { title: "", members: [] },
    ImportantConsiderations: { title: "", sections: [] }
  });

  const tabs = [
    { id: "1", label: "About & Principal", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg> },
    { id: "2", label: "Vision & Mission", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg> },
    { id: "3", label: "Governance & News", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg> },
    { id: "4", label: "Campuses & More", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg> }
  ];

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const response = await getPage("about-ndc");
      if (response?.data) {
        setFormData(prev => ({...prev, ...response.data}));
        setIsEditMode(true);
      }
    } catch (error) {
      console.error("Error fetching About data:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const handleNestedChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayAdd = (section, arrayField, emptyObj) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [arrayField]: [...(prev[section][arrayField] || []), emptyObj]
      }
    }));
  };

  const handleArrayRemove = (section, arrayField, index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#F6872A",
      cancelButtonColor: "#0e2455",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        setFormData(prev => {
          const newArr = [...(prev[section][arrayField] || [])];
          newArr.splice(index, 1);
          return {
            ...prev,
            [section]: {
              ...prev[section],
              [arrayField]: newArr
            }
          };
        });
      }
    });
  };

  const handleArrayChange = (section, arrayField, index, key, value) => {
    setFormData(prev => {
      const newArr = [...(prev[section][arrayField] || [])];
      newArr[index] = { ...newArr[index], [key]: value };
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [arrayField]: newArr
        }
      };
    });
  };
  
  const handleStringArrayChange = (section, field, value) => {
    handleNestedChange(section, field, value.split("\n\n"));
  };
  
  const handleStringArrayInObjectArrayChange = (section, arrayField, index, key, value) => {
    handleArrayChange(section, arrayField, index, key, value.split("\n\n"));
  };

  const renderArrayEditor = (section, arrayField, fieldsConfig, emptyItemTemplate, title) => {
    const arr = formData[section]?.[arrayField] || [];
    return (
      <div className="array-editor">
        <div className="array-editor__header">
          <h6>{title}</h6>
          <button 
            type="button"
            className="btn array-editor__add-btn"
            onClick={() => handleArrayAdd(section, arrayField, emptyItemTemplate)}
          >
            + Add Item
          </button>
        </div>
        {arr.map((item, index) => (
          <div key={index} className="array-editor__item">
            <button 
              type="button"
              className="btn array-editor__remove-btn"
              onClick={() => handleArrayRemove(section, arrayField, index)}
            >
              Remove
            </button>
            <div className="flex flex-wrap -mx-3">
              {fieldsConfig.map((f, i) => (
                <div className="w-full md:w-1/2 px-3" key={i}>
                  {f.isImage ? (
                    <ImagePreviewControl
                      label={f.label}
                      value={item[f.key] || ""}
                      onChange={(val) => handleArrayChange(section, arrayField, index, f.key, val)}
                    />
                  ) : f.isTextarea ? (
                    <div className="mb-3">
                      <label className="themed-label">{f.label}</label>
                      <textarea
                        className="themed-input"
                        rows={f.rows || 3}
                        value={f.isStringArray ? (item[f.key] || []).join("\n\n") : (item[f.key] || "")}
                        onChange={(e) => f.isStringArray ? handleStringArrayInObjectArrayChange(section, arrayField, index, f.key, e.target.value) : handleArrayChange(section, arrayField, index, f.key, e.target.value)}
                      />
                    </div>
                  ) : (
                    <div className="mb-3">
                      <label className="themed-label">{f.label}</label>
                      <input
                        className="themed-input"
                        type={f.type || "text"}
                        value={item[f.key] || ""}
                        onChange={(e) => handleArrayChange(section, arrayField, index, f.key, e.target.value)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        {arr.length === 0 && <p className="array-editor__empty">No items added yet.</p>}
      </div>
    );
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    try {
      await putPage("about-ndc", formData);
      Swal.fire({
        title: "Success",
        text: "About data saved successfully!",
        icon: "success",
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
      });
      const publicPath = publicPathForRoute("about-ndc");
      if (publicPath) triggerRevalidate(publicPath);
    } catch (error) {
      console.error("Error saving data:", error);
      Swal.fire("Error", "Failed to save data. Check console for details.", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="about-loading">
        <div className="spinner-border text-warning" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content about-admin-container">
      <div className="container about-admin-shell">
        <div className="about-hero">
          <div>
            <h2>About NDC - Content Studio</h2>
            <p>Manage content for the public About page with a cleaner structured editor.</p>
          </div>
          <div className="about-meta-pills">
            <span className="about-meta-pill">{isEditMode ? "Edit Mode" : "Create Mode"}</span>
            <span className="about-meta-pill">{saving ? "Saving..." : "Ready"}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="nav nav-tabs about-tabs custom-tabs">
            {tabs.map((tab) => (
              <div className="nav-item" key={tab.id}>
                <button type="button" 
                  className={classnames('nav-link', { active: activeTab === tab.id })}
                  onClick={() => toggleTab(tab.id)}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              </div>
            ))}
          </div>

          <div className="tab-content about-tab-content">
            {activeTab === "1" && (<div className="tab-pane active">
              <div className="purpose-principal-section">
                <div className="pp-card" style={{ flex: 1 }}>
                   <div className="pp-card__header">
                      <div className="icon-box">
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                      </div>
                      <div>
                         <h4>About Us</h4>
                         <p>The main introduction section.</p>
                      </div>
                   </div>
                   
                   <div className="field-with-icon">
                      <div className="field-content" style={{width: '100%'}}>
                         <label>TITLE</label>
                         <div className="input-wrapper">
                            <input type="text" value={formData.aboutUs?.title || ""} onChange={(e) => handleNestedChange("aboutUs", "title", e.target.value)} />
                         </div>
                      </div>
                   </div>
                   <div className="field-with-icon">
                      <div className="field-content" style={{width: '100%'}}>
                         <label>DESCRIPTION (Separate paragraphs with double newline)</label>
                         <div className="input-wrapper">
                            <textarea rows={5} value={(formData.aboutUs?.description || []).join("\n\n")} onChange={(e) => handleStringArrayChange("aboutUs", "description", e.target.value)} />
                         </div>
                      </div>
                   </div>
                   <div className="field-with-icon">
                      <div className="field-content" style={{width: '100%'}}>
                         <ImagePreviewControl label="COVER IMAGE" value={formData.aboutUs?.image || ""} onChange={(url) => handleNestedChange("aboutUs", "image", url)} />
                      </div>
                   </div>
                </div>

                <div className="pp-card" style={{ flex: 1 }}>
                   <div className="pp-card__header">
                      <div className="icon-box">
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                      </div>
                      <div>
                         <h4>Principal's Message</h4>
                         <p>Details and message from the principal.</p>
                      </div>
                   </div>
                   
                   <div className="field-with-icon">
                      <div className="field-content" style={{width: '100%'}}>
                         <label>SECTION TITLE</label>
                         <div className="input-wrapper">
                            <input type="text" value={formData.principalMessage?.title || ""} onChange={(e) => handleNestedChange("principalMessage", "title", e.target.value)} />
                         </div>
                      </div>
                   </div>
                   <div className="field-with-icon">
                      <div className="field-content" style={{width: '100%'}}>
                         <label>PRINCIPAL NAME</label>
                         <div className="input-wrapper">
                            <input type="text" value={formData.principalMessage?.principalName || ""} onChange={(e) => handleNestedChange("principalMessage", "principalName", e.target.value)} />
                         </div>
                      </div>
                   </div>
                   <div className="field-with-icon">
                      <div className="field-content" style={{width: '100%'}}>
                         <label>POSITION</label>
                         <div className="input-wrapper">
                            <input type="text" value={formData.principalMessage?.position || ""} onChange={(e) => handleNestedChange("principalMessage", "position", e.target.value)} />
                         </div>
                      </div>
                   </div>
                   <div className="field-with-icon">
                      <div className="field-content" style={{width: '100%'}}>
                         <label>MESSAGE (Separate paragraphs with double newline)</label>
                         <div className="input-wrapper">
                            <textarea rows={5} value={(formData.principalMessage?.message || []).join("\n\n")} onChange={(e) => handleStringArrayChange("principalMessage", "message", e.target.value)} />
                         </div>
                      </div>
                   </div>
                   <div className="field-with-icon">
                      <div className="field-content" style={{width: '100%'}}>
                         <ImagePreviewControl label="PRINCIPAL PHOTO" value={formData.principalMessage?.image || ""} onChange={(url) => handleNestedChange("principalMessage", "image", url)} />
                      </div>
                   </div>
                </div>
              </div>
            </div>)}

            {activeTab === "2" && (<div className="tab-pane active">
              <div className="themed-card">
                 <div className="themed-card__header">
                   <h5>Vision & Mission</h5>
                 </div>
                 <div className="themed-card__body">
                    {renderArrayEditor(
                      "VisionMission",
                      "dropdowns",
                      [
                        { label: "Title (e.g. Vision)", key: "title", type: "text" },
                        { label: "Description (paragraphs)", key: "description", isTextarea: true, isStringArray: true, rows: 4 }
                      ],
                      { title: "", description: [] },
                      "Dropdown Blocks"
                    )}
                 </div>
              </div>
            </div>)}

            {activeTab === "3" && (<div className="tab-pane active">
              <div className="themed-card mb-4">
                 <div className="themed-card__header">
                   <h5>Newsletters</h5>
                 </div>
                 <div className="themed-card__body">
                    <div className="mb-4">
                      <label className="themed-label">Section Title</label>
                      <input className="themed-input" type="text" value={formData.NewsLetter?.title || ""} onChange={(e) => handleNestedChange("NewsLetter", "title", e.target.value)} />
                    </div>
                    {renderArrayEditor(
                      "NewsLetter",
                      "sections",
                      [
                        { label: "Volume Title", key: "title", type: "text" },
                        { label: "PDF URL", key: "pdf", type: "text", isImage: true }
                      ],
                      { title: "", pdf: "" },
                      "Newsletter Volumes"
                    )}
                 </div>
              </div>

              <div className="themed-card">
                 <div className="themed-card__header">
                   <h5>Governing Council Members</h5>
                 </div>
                 <div className="themed-card__body">
                    <div className="mb-4">
                      <label className="themed-label">Section Title</label>
                      <input className="themed-input" type="text" value={formData.GoverningCouncilMembers?.title || ""} onChange={(e) => handleNestedChange("GoverningCouncilMembers", "title", e.target.value)} />
                    </div>
                    {renderArrayEditor(
                      "GoverningCouncilMembers",
                      "members",
                      [
                        { label: "Name", key: "name", type: "text" },
                        { label: "Designation", key: "designation", type: "text" },
                        { label: "Position", key: "position", type: "text" }
                      ],
                      { name: "", designation: "", position: "" },
                      "Members List"
                    )}
                 </div>
              </div>
            </div>)}

            {activeTab === "4" && (<div className="tab-pane active">
              <div className="themed-card mb-4">
                 <div className="themed-card__header">
                   <h5>Our Campuses</h5>
                 </div>
                 <div className="themed-card__body">
                    <div className="mb-4">
                      <label className="themed-label">Section Title</label>
                      <input className="themed-input" type="text" value={formData.OurCampuses?.title || ""} onChange={(e) => handleNestedChange("OurCampuses", "title", e.target.value)} />
                    </div>
                    {renderArrayEditor(
                      "OurCampuses",
                      "campuses",
                      [
                        { label: "College Name", key: "collegeName", type: "text" },
                        { label: "Location", key: "location", type: "text" },
                        { label: "Link", key: "link", type: "text" },
                        { label: "Image URL", key: "image", isImage: true },
                        { label: "Description", key: "collegeDescription", isTextarea: true, rows: 3 }
                      ],
                      { collegeName: "", collegeDescription: "", location: "", link: "", image: "" },
                      "Campuses"
                    )}
                 </div>
              </div>

              <div className="themed-card">
                 <div className="themed-card__header">
                   <h5>Important Considerations</h5>
                 </div>
                 <div className="themed-card__body">
                    <div className="mb-4">
                      <label className="themed-label">Section Title</label>
                      <input className="themed-input" type="text" value={formData.ImportantConsiderations?.title || ""} onChange={(e) => handleNestedChange("ImportantConsiderations", "title", e.target.value)} />
                    </div>
                    {renderArrayEditor(
                      "ImportantConsiderations",
                      "sections",
                      [
                        { label: "Title", key: "title", type: "text" },
                        { label: "PDF URL", key: "pdf", type: "text", isImage: true }
                      ],
                      { title: "", pdf: "" },
                      "PDF Sections"
                    )}
                 </div>
              </div>
            </div>)}

          </div>

          <div className="about-footer-actions">
            <button type="submit" className="save-btn" disabled={saving}>
              {saving ? "Saving Changes..." : "Save About Content"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
