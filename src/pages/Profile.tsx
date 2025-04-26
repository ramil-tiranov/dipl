import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

interface Report {
  uuid: string;
  created_at: string;
  description: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState({
    email: '',
    username: '',
    created_at: '',
    updated_at: '',
  });
  const [reports, setReports] = useState<Report[]>([]);
  const [loadingReports, setLoadingReports] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:8000/users/profile', {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          navigate('/signin');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        navigate('/signin');
      }
    };

    const fetchReports = async () => {
      try {
        const response = await fetch('http://localhost:8000/vulnerability-detector/get-my-reports', {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setReports(data);
        } else {
          console.error('Failed to fetch reports');
        }
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoadingReports(false);
      }
    };

    fetchProfile();
    fetchReports();
  }, [navigate]);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  const downloadReport = async (uuid: string) => {
    try {
      const response = await fetch(`http://localhost:8000/vulnerability-detector/${uuid}/download`, {
        credentials: 'include',
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `${uuid}.zip`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Failed to download report');
      }
    } catch (error) {
      console.error('Error downloading report:', error);
    }
  };

  return (
    <div className="profile-container">
      <h1 className="profile-header">Profile</h1>

      <div className="profile-info">
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Username:</strong> {profile.username}</p>
        <p><strong>Created At:</strong> {formatDate(profile.created_at)}</p>
        <p><strong>Updated At:</strong> {formatDate(profile.updated_at)}</p>
      </div>

      <div className="reports-section">
        <h2>My Reports</h2>

        {loadingReports ? (
          <p>Loading reports...</p>
        ) : reports.length === 0 ? (
          <p className="no-reports">No reports yet. Create your first report!</p>
        ) : (
          <div className="reports-grid">
            {reports.map((report) => (
              <div key={report.uuid} className="report-card">
                <div className="report-info">
                  <p><strong>Description:</strong> {report.description || 'No description'}</p>
                  <p><strong>Created:</strong> {formatDate(report.created_at)}</p>
                </div>
                <button
                  className="download-button"
                  onClick={() => downloadReport(report.uuid)}
                >
                  ⬇️ Download ZIP
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
