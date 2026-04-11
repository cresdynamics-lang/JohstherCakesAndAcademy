import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CakesShowcase from './components/CakesShowcase';
import Academy from './components/Academy';
import Courses from './components/Courses';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import { useAuth } from './context/AuthContext';
import { useNavigation } from './context/NavigationContext';
import CheckoutPage from './pages/CheckoutPage';

export default function App() {
  const { isAuthModalOpen, closeAuthModal, authDefaultTab } = useAuth();
  const { currentPage } = useNavigation();

  return (
    <>
      {currentPage === 'home' && (
        <>
          <Navbar />
          <CartDrawer />
          <main>
            <Hero />
            <CakesShowcase />
            <Academy />
            <Courses />
            <Testimonials />
            <FAQ />
            <Contact />
          </main>
          <Footer />
        </>
      )}

      {currentPage === 'checkout' && (
        <CheckoutPage />
      )}
      
      <AuthModal
        open={isAuthModalOpen}
        onClose={closeAuthModal}
        defaultTab={authDefaultTab}
      />
    </>
  );
}
