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

        setUploadStatus('Файл успешно загружен и отправлен на анализ! Вы можете скачать отчет ниже.');
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
      a.download = 'report.zip'; // <-- скачиваем как ZIP
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
    <div className="upload-container">
      <h1>Загрузка файлов или папки</h1>
      <p>Выберите файл для анализа.</p>

      <div className="upload-controls">
        <label className="upload-button">
          📄 Выбрать файл
          <input type="file" onChange={handleFileChange} />
        </label>

        <input
          type="text"
          placeholder="Режим анализа (например, sql)"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="mode-input"
        />

        <button className="upload-button" onClick={handleUpload}>
          🚀 Отправить на анализ
        </button>
      </div>

      {files && (
        <div className="file-list">
          <h2>Выбранный файл:</h2>
          <pre>{files[0].name}</pre>
        </div>
      )}

      {isLoading && (
        <div className="loading">
          <p>⏳ Загрузка файла и анализ...</p>
        </div>
      )}

      {uploadStatus && (
        <div className="upload-status">
          <p>{uploadStatus}</p>
        </div>
      )}

      {reportUuid && (
        <div className="download-link">
          <button className="upload-button" onClick={handleDownload}>
            📥 Скачать отчет (ZIP)
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
