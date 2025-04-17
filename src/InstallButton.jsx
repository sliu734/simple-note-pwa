import { useEffect, useState } from 'react';

function InstallButton() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault(); // stop the mini info bar from appearing on mobile
            setDeferredPrompt(e);
            setShowButton(true); // display the install button
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstall = () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();

        deferredPrompt.userChoice.then(() => {
            setDeferredPrompt(null);
            setShowButton(false); // hide the install button after installation
        });
    };

    if (!showButton) return null;

    return (
        <div className="install-button-container">
            <button className="install-button" onClick={handleInstall}>Install App</button>
        </div>

    );
}

export default InstallButton;
