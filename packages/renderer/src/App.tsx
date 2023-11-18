import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DefaultIconsRedirect } from './components/modules/IconsHome/DefaultIconsRedirect';
import IconsHome from './components/modules/IconsHome';
import { Layout } from './components/ui/layout';
import { setupGlobalListeners } from './data/globalListeners';

import 'rc-tooltip/assets/bootstrap.css';
import '@fontsource/dm-sans';
import './App.css';
import { PreferenceModal } from './components/ui/PreferenceModal';
import { usePreferenceModalSetup } from './components/ui/PreferenceModal/hooks/usePreferenceSetup';
import { UpdateAvailablePopup } from './components/ui/UpdateAvailablePopup';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

setupGlobalListeners();

export default function App() {
  const { isPreferenceModalVisible, setIsPreferenceModalVisible } = usePreferenceModalSetup();

  return (
    <Router>
      <Layout>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<DefaultIconsRedirect />} />
            <Route path="/collections/:collectionId" element={<IconsHome />} />
          </Routes>

          {isPreferenceModalVisible && (
            <PreferenceModal
              show={isPreferenceModalVisible}
              onClose={() => setIsPreferenceModalVisible(false)}
            />
          )}

          <UpdateAvailablePopup />
        </QueryClientProvider>
      </Layout>
    </Router>
  );
}
