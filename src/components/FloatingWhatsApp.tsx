import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FloatingWhatsApp() {
    return (
        <motion.a
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
            href="https://wa.me/27847862260?text=Hi+Qroma+I+have+an+enquiry"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 flex items-center justify-center transition-all duration-300"
        >
            <MessageCircle className="w-7 h-7" />
        </motion.a>
    );
}
