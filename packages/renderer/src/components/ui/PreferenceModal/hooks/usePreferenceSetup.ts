import { useCallback, useEffect, useState } from 'react';

export const usePreferenceModalSetup = () => {
  const [isPreferenceModalVisible, setIsPreferenceModalVisible] = useState(false);

  const onOpenPreferencesCallback = useCallback(() => {
    setIsPreferenceModalVisible(true);
  }, []);

  useEffect(() => {
    window.electron.ipcRenderer.on('open-preferences-modal', onOpenPreferencesCallback);

    return () => {
      window.electron.ipcRenderer.removeListener(
        'open-preferences-modal',
        onOpenPreferencesCallback
      );
    };
  }, [onOpenPreferencesCallback]);

  return {
    isPreferenceModalVisible,
    setIsPreferenceModalVisible,
  };
};
