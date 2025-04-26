import React, { useState } from 'react';
import '../styles/Analys.css';

const UploadPage: React.FC = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [mode, setMode] = useState<string>('');
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reportUuid, setReportUuid] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const handleUpload = async () => {
    if (!files || files.length === 0) {
      setUploadStatus('Выберите хотя бы один файл для загрузки.');
      return;
    }

    const formData = new FormData();
    formData.append('file', files[0]);

    try {
      setIsLoading(true);
      setUploadStatus('Идет загрузка и анализ файла...');

      const response = await fetch(`http://localhost:8000/vulnerability-detector/create-report${mode ? `?mode=${mode}` : ''}`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setReportUuid(data.uuid);
        setUploadStatus('Файл успешно загружен и отправлен на анализ!');
      } else {
        setUploadStatus(`Ошибка загрузки: ${response.status}`);
        setReportUuid('');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('Ошибка загрузки.');
      setReportUuid('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!reportUuid) return;

    try {
      const response = await fetch(`http://localhost:8000/vulnerability-detector/${reportUuid}/download`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Ошибка скачивания файла');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'report.zip';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      setUploadStatus('Ошибка при скачивании отчета.');
    }
  };

  return (
    <div className="upload-page">
      <div className="glass-card main-card">
        <div className="card-header">
          <h1 className="gradient-text">Анализ уязвимостей кода</h1>
          <p className="subtitle">Загрузите файл для автоматического поиска уязвимостей</p>
        </div>

        <div className="upload-section glass-card">
          <div className="file-selector">
            <label className="file-input-label">
              <input type="file" onChange={handleFileChange} />
              <div className="file-input-button">
                <span className="icon">📁</span>
                <span>Выбрать файл</span>
              </div>
            </label>
            {files && (
              <div className="file-preview">
                <div className="file-icon">📄</div>
                <div className="file-info">
                  <div className="file-name">{files[0].name}</div>
                  <div className="file-size">{(files[0].size / 1024).toFixed(2)} KB</div>
                </div>
              </div>
            )}
          </div>

          <div className="mode-selector">
            <input
              type="text"
              placeholder="Режим анализа (например: SQL, XSS, etc)"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="mode-input"
            />
          </div>

          <button 
            className="upload-button" 
            onClick={handleUpload}
            disabled={isLoading || !files}
          >
            {isLoading ? (
              <span className="loading-spinner"></span>
            ) : (
              <>
                <span className="icon">🚀</span>
                <span>Начать анализ</span>
              </>
            )}
          </button>
        </div>

        {uploadStatus && (
          <div className={`status-card ${reportUuid ? 'success' : uploadStatus.includes('Ошибка') ? 'error' : 'info'}`}>
            <div className="status-icon">
              {reportUuid ? '✅' : uploadStatus.includes('Ошибка') ? '❌' : 'ℹ️'}
            </div>
            <div className="status-content">
              <h3>{reportUuid ? 'Анализ завершен' : uploadStatus.includes('Ошибка') ? 'Ошибка' : 'Статус'}</h3>
              <p>{uploadStatus}</p>
            </div>
          </div>
        )}

        {reportUuid && (
          <div className="result-card glass-card">
            <div className="result-header">
              <h3>📊 Результаты анализа</h3>
              <div className="badge">Готово</div>
            </div>
            <div className="result-content">
              <p>Файл успешно проанализирован на наличие уязвимостей.</p>
              <button 
                className="download-button"
                onClick={handleDownload}
              >
                <span className="icon">⏬</span>
                <span>Скачать отчет (ZIP)</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPage;