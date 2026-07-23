// If Supabase-Configuration.js still has its PASTE_YOUR_... placeholders, stop
// here with a friendly message. Without this, Supabase throws a cryptic
// "Invalid URL" the moment it tries to connect - this explains the real fix
// instead. (Delete nothing here; just fill in Supabase-Configuration.js.)
if (
    typeof SUPABASE_URL === 'undefined' ||
    typeof SUPABASE_ANON_KEY === 'undefined' ||
    SUPABASE_URL.startsWith('PASTE_') ||
    SUPABASE_ANON_KEY.startsWith('PASTE_')
) {
    document.body.innerHTML = `
        <div style="max-width:600px;margin:80px auto;padding:30px;font-family:'Lato',sans-serif;
                    background:#fffef9;border-radius:12px;border-left:4px solid #c9a87c;
                    box-shadow:0 4px 15px rgba(90,74,106,0.1);color:#5a4a6a;line-height:1.6;">
            <h2 style="font-family:'Playfair Display',serif;margin-bottom:15px;">🔒 One step first</h2>
            <p>Open <strong>Supabase-Configuration.js</strong> and paste in your own Supabase
            <strong>Project URL</strong> and <strong>anon key</strong>, then refresh.</p>
            <p style="margin-top:12px;">Both values are safe to be public - it's the Row Level
            Security guard (in <strong>supabase-setup.sql</strong>) that keeps your diary private,
            not the secrecy of the key. See the README to create a free Supabase project.</p>
        </div>`;
    throw new Error('Supabase not configured yet - fill in Supabase-Configuration.js');
}

// Initialize Supabase client
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Element references
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const signUpBtn = document.getElementById('signUpBtn');
const logInBtn = document.getElementById('logInBtn');
const logOutBtn = document.getElementById('logOutBtn');
const authStatus = document.getElementById('authStatus');
const authFields = document.getElementById('authFields');
const diarySection = document.getElementById('diarySection');
const entryTitle = document.getElementById('entryTitle');
const entryContent = document.getElementById('entryContent');
const saveEntryBtn = document.getElementById('saveEntryBtn');
const entriesList = document.getElementById('entriesList');
const lockIcon = document.getElementById('lockIcon');
const toastContainer = document.getElementById('toastContainer');

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toastOut 0.3s ease-out forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Update UI based on auth state
function updateUI(isLoggedIn) {
    if (isLoggedIn) {
        authFields.classList.add('hidden');
        diarySection.classList.remove('hidden');
        lockIcon.textContent = '🔓';
        lockIcon.classList.add('unlocked');
        setTimeout(() => lockIcon.classList.remove('unlocked'), 500);
    } else {
        authFields.classList.remove('hidden');
        diarySection.classList.add('hidden');
        lockIcon.classList.add('locking');
        setTimeout(() => {
            lockIcon.textContent = '🔒';
            lockIcon.classList.remove('locking');
        }, 300);
        entriesList.innerHTML = '';
    }
}

// Sign Up
signUpBtn.addEventListener('click', async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password
    });

    if (error) {
        showToast(error.message, 'error');
    } else if (data.session) {
        // Email confirmation is off, so Supabase logged us straight in - the
        // auth listener below will drop us into the diary. Don't tell the user
        // to check an email that will never arrive.
        showToast("Account created - you're in!");
    } else {
        showToast('Check your email to confirm your account!');
    }
});

// Log In
logInBtn.addEventListener('click', async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        showToast(error.message, 'error');
    } else {
        showToast('Welcome back!');
        // Entries load via the auth listener below when the session appears,
        // so we don't also load them here.
    }
});

// Log Out
logOutBtn.addEventListener('click', async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
        showToast(error.message, 'error');
    } else {
        showToast('Logged out');
    }
});

// Listen for auth state changes
supabaseClient.auth.onAuthStateChange((event, session) => {
    if (session) {
        authStatus.textContent = `Logged in as ${session.user.email}`;
        authStatus.style.color = '#5a4a6a';
        updateUI(true);
        loadEntries();
    } else {
        authStatus.textContent = 'Not logged in';
        authStatus.style.color = '#999';
        updateUI(false);
    }
});

// Save entry to Supabase
saveEntryBtn.addEventListener('click', async () => {
    const title = entryTitle.value;
    const content = entryContent.value;

    if (!title || !content) {
        showToast('Please fill in both title and content', 'error');
        return;
    }

    const { data, error } = await supabaseClient
        .from('entries')
        .insert([{ title: title, content: content }]);

    if (error) {
        showToast(error.message, 'error');
    } else {
        showToast('Entry saved!');
        entryTitle.value = '';
        entryContent.value = '';
        loadEntries();
    }
});

// Load entries from Supabase
async function loadEntries() {
    // This looks like it would get ALL entries...
    const { data, error } = await supabaseClient
        .from('entries')
        .select('*')
        .order('created_at', { ascending: false });
    // ...but RLS ensures we only get OUR entries!

    if (error) {
        console.error('Error loading entries:', error);
        return;
    }

    entriesList.innerHTML = '';

    if (data.length === 0) {
        entriesList.innerHTML = `
            <div class="empty-state">
                <div class="icon">📝</div>
                <p>No entries yet. Start your journey...</p>
            </div>
        `;
        return;
    }

    data.forEach(entry => {
        const entryEl = document.createElement('div');
        entryEl.className = 'entry';
        const date = new Date(entry.created_at).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        });
        // Build with textContent, not innerHTML, so an entry containing
        // characters like <, &, or "<3" shows up exactly as typed instead of
        // being treated as HTML. (Same safety habit Project 08 teaches.)
        const titleEl = document.createElement('h3');
        titleEl.textContent = entry.title;
        const contentEl = document.createElement('p');
        contentEl.textContent = entry.content;
        const dateEl = document.createElement('div');
        dateEl.className = 'date';
        dateEl.textContent = date;

        entryEl.append(titleEl, contentEl, dateEl);
        entriesList.appendChild(entryEl);
    });
}
