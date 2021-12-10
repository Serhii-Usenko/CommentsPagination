import React, { useState, useEffect } from 'react';

export default function ButtonTheme() {
    const [theme, setTheme] = useState('lightMod');
    const [btnName, setBtnName] = useState('Light Mod');

	const toggleTheme = () => {
		if(theme === 'lightMod') {
            setTheme('darkMod') 
        } else {setTheme('lightMod')}
	}

	useEffect(() => {
		document.documentElement.className = theme
	}, [theme]);

    return (
        <div className="theme">
            <button type="button" onClick={toggleTheme}>
                Change theme
            </button>
        </div>
    )
}
