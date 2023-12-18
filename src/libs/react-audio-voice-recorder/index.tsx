import { AudioRecorder } from 'react-audio-voice-recorder';
import { socketClient } from '../socket.io';

export default function RecorderComponent() {
  const addAudioElement = async (blob: Blob) => {
    // const url = URL.createObjectURL(blob);

    // const audio = document.createElement('audio');
    // audio.src = url;
    // audio.controls = true;
    const form = new FormData()
    form.append('audio', blob)
    socketClient.sendAudio(form)
  };

  return (
    <div>
      <AudioRecorder
        onRecordingComplete={addAudioElement}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,

          // autoGainControl,
          // channelCount,
          // deviceId,
          // groupId,
          // sampleRate,
          // sampleSize,
        }}
        onNotAllowedOrFound={(err) => console.table(err)}
        downloadOnSavePress={false}
        downloadFileExtension="webm"
        mediaRecorderOptions={{
          audioBitsPerSecond: 128000,
        }}

        // showVisualizer={true}
      />
    </div>
  );
}
