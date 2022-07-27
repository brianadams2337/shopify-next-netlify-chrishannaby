import { useEffect } from 'react';

function ScriptInjector() {

    /* Let's imagine we need to append our key to the url for
    example, there's often some identification that needs to
    be supplied */
    const ourApiKey = '123456789';
    const thirdParyUrl = 'https://theirscript.js';

    // We'll use useEffect to load once when component is mounted
    useEffect(() => {
        // Obviously, id has to match what's used in id below
		const existingScript = document.getElementById('third-party-script');

        // Ensure it's only loaded on the page once
		if (!existingScript) {
			const thirdPartyScript = document.createElement('script');
			thirdPartyScript.src = thirdParyUrl + '?key=' + ourApiKey;
			thirdPartyScript.id = 'third-party-script';
			document.body.appendChild(thirdPartyScript);

            /* In some instances, we need to initiate their script
            from our side once the external script has loaded, in
            that case, I create my own js file that calls their
            function, and load it on the page, after the external
            script has loaded */
			thirdPartyScript.onload = () => {
				const initFunction = document.createElement('script');
				initFunction.src = '/static/initFunction.js';
				initFunction.id = 'initFunction';
				document.body.appendChild(initFunction);
			};
		}
	});
	return null;
}

export default ScriptInjector;
