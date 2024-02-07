import React, { useState } from 'react';

interface LanguageModalProps {
    onSelectLanguage: (language: string) => void;
    onClose: () => void;
}

const LanguageModal: React.FC<LanguageModalProps> = ({
    onSelectLanguage,
    onClose,
}) => {
    const [selectedLanguage, setSelectedLanguage] = useState('');

    const handleLanguageSelect = (language: string) => {
        setSelectedLanguage(language);
        onSelectLanguage(language);
        onClose();
    };

    return (
        <div className="language-modal">
            <button onClick={() => handleLanguageSelect('korean')}>
                한국어
            </button>
            <button onClick={() => handleLanguageSelect('english')}>
                English
            </button>
        </div>
    );
};

export default LanguageModal;
