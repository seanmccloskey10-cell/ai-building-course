// Get references to our page elements
const imageUpload = document.getElementById('image-upload');
const resultDiv = document.getElementById('result');

// When someone selects an image file
imageUpload.addEventListener('change', function(event) {
    const file = event.target.files[0];

    // Make sure they actually selected a file
    if (!file) {
        return;
    }

    // Check if it's actually an image
    if (!file.type.startsWith('image/')) {
        alert('Please select an image file!');
        return;
    }

    // Read the image file so we can show a preview
    const reader = new FileReader();

    reader.onload = function(e) {
        // Show the image preview and the roast button
        resultDiv.innerHTML = `
            <div class="text-center">
                <img
                    src="${e.target.result}"
                    alt="Your uploaded picture"
                    class="max-w-full h-auto rounded-2xl shadow-2xl mx-auto mb-6 border-4 border-purple-200"
                    style="max-height: 400px;"
                >
                <button
                    id="roast-button"
                    class="gradient-bg text-white font-black text-2xl px-12 py-5 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all cursor-pointer animate-pulse"
                >
                    🔥 ROAST THIS! 🔥
                </button>
                <div id="roast-result" class="mt-6"></div>
            </div>
        `;

        // Set up the roast button to call our SECURE backend
        const roastButton = document.getElementById('roast-button');
        const imageData = e.target.result; // Save the image data

        roastButton.addEventListener('click', async function() {
            const roastResult = document.getElementById('roast-result');

            // Show loading message
            roastResult.innerHTML = `
                <div class="bg-gradient-to-r from-orange-100 to-purple-100 rounded-2xl p-8 text-center border-4 border-purple-300 animate-pulse">
                    <p class="text-gray-700 text-xl font-bold">
                        🔥 The comedian is sizing up your picture... this is gonna hurt 🔥
                    </p>
                </div>
            `;

            try {
                // Call our SECURE backend function
                const response = await fetch('/.netlify/functions/roast', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        image: imageData
                    })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Failed to get roast');
                }

                // Show the roast!
                roastResult.innerHTML = `
                    <div class="bg-gradient-to-r from-red-100 via-orange-100 to-yellow-100 rounded-2xl p-8 border-4 border-orange-400 shadow-2xl">
                        <p class="text-gray-900 text-2xl font-black text-center leading-relaxed">
                            "${data.roast}"
                        </p>
                        <p class="text-center mt-4 text-sm text-gray-600 font-bold">
                            - your AI roast comedian 🎤
                        </p>
                    </div>
                `;

            } catch (error) {
                roastResult.innerHTML = `
                    <div class="bg-red-100 rounded-2xl p-8 border-4 border-red-400">
                        <p class="text-red-800 text-xl font-bold text-center">
                            ❌ Error: ${error.message}
                        </p>
                    </div>
                `;
            }
        });
    };

    // Start reading the file
    reader.readAsDataURL(file);
});
