document.addEventListener('DOMContentLoaded', () => {
    
    // --- State Management ---
    const state = {
        crisisType: 'Flood',
        location: 'Kerala, India',
        theme: 'blue',
        modules: {
            resources: true,
            volunteers: true,
            comms: true,
            helpline: false,
            grievance: false
        },
        viewMode: 'mobile' // 'mobile' or 'desktop'
    };

    // --- DOM Elements ---
    // CMS Inputs
    const typeSelect = document.getElementById('crisis-type');
    const locationInput = document.getElementById('crisis-location');
    const moduleToggles = document.querySelectorAll('.toggle-switch input');
    const colorSwatches = document.querySelectorAll('.color-swatch');
    
    // View Toggles
    const viewBtns = document.querySelectorAll('.view-btn');
    const deviceView = document.getElementById('device-view');

    // Preview Target Elements
    const prevTitle = document.getElementById('preview-title');
    const prevLocation = document.getElementById('preview-location');
    const heroTitle = document.getElementById('hero-title');
    const portalModulesContainer = document.getElementById('portal-modules');

    // Templates
    const templates = {
        resources: document.getElementById('tpl-resources'),
        volunteers: document.getElementById('tpl-volunteers'),
        comms: document.getElementById('tpl-comms'),
        helpline: document.getElementById('tpl-helpline'),
        grievance: document.getElementById('tpl-grievance')
    };

    // --- Core Logic ---

    function init() {
        // Setup initial UI mapping based on DOM (in case they don't match state defaults)
        syncStateFromDOM();
        renderPreview();
        attachEventListeners();
    }

    function syncStateFromDOM() {
        state.crisisType = typeSelect.value;
        state.location = locationInput.value;
        
        moduleToggles.forEach(toggle => {
            state.modules[toggle.value] = toggle.checked;
        });

        const activeSwatch = document.querySelector('.color-swatch.active');
        if(activeSwatch) {
            state.theme = activeSwatch.dataset.color;
        }
    }

    // Single source of truth render function update
    function renderPreview() {
        // Update Text
        prevTitle.textContent = `${state.crisisType} Response`;
        prevLocation.textContent = state.location || 'Location Not Set';
        heroTitle.textContent = `${state.crisisType} Assistance Portal`;

        // Update Theme
        document.body.className = `theme-${state.theme}`;

        // Render Modules
        renderModules();
    }

    function renderModules() {
        // Clear current modules
        portalModulesContainer.innerHTML = '';
        
        // Loop through state and append active ones based on order defined below
        const moduleOrder = ['comms', 'resources', 'volunteers', 'helpline', 'grievance'];
        let delay = 0;

        moduleOrder.forEach(modName => {
            if (state.modules[modName]) {
                const template = templates[modName];
                if (template) {
                    const clone = template.content.cloneNode(true);
                    
                    // Update dynamic content within clone if necessary
                    const locPlaceholder = clone.querySelector('.loc-placeholder');
                    if (locPlaceholder) {
                        locPlaceholder.textContent = state.location || 'the area';
                    }

                    // For cascading animation
                    const card = clone.querySelector('.module-card');
                    if(card) {
                        card.style.animationDelay = `${delay}s`;
                        delay += 0.05;
                    }

                    portalModulesContainer.appendChild(clone);
                }
            }
        });
    }

    // --- Event Listeners ---

    function attachEventListeners() {
        // 1. Text Inputs
        typeSelect.addEventListener('change', (e) => {
            state.crisisType = e.target.value;
            
            // Auto-switch themes based on crisis type for presentation "wow" factor
            let autoTheme = 'blue';
            if(state.crisisType === 'Wildfire') autoTheme = 'orange';
            if(state.crisisType === 'Earthquake') autoTheme = 'teal';
            if(state.crisisType === 'Hurricane') autoTheme = 'purple';
            if(state.crisisType === 'Pandemic') autoTheme = 'red';
            
            triggerThemeChange(autoTheme);
            renderPreview();
        });

        locationInput.addEventListener('input', (e) => {
            state.location = e.target.value;
            // Update immediately without full re-render for typing speed
            prevLocation.textContent = state.location || 'Location Not Set';
            
            // Note: full re-render is needed to update placeholders inside modules, 
            // but we use a debounce to prevent jitter while typing
            clearTimeout(window.locationTimeout);
            window.locationTimeout = setTimeout(renderModules, 500);
        });

        // 2. Module Toggles
        moduleToggles.forEach(toggle => {
            toggle.addEventListener('change', (e) => {
                state.modules[e.target.value] = e.target.checked;
                renderModules();
            });
        });

        // 3. Theme Swatches
        colorSwatches.forEach(swatch => {
            swatch.addEventListener('click', (e) => {
                const color = e.target.dataset.color;
                triggerThemeChange(color);
                renderPreview();
            });
        });

        // 4. View Mode Toggles (Mobile vs Desktop)
        viewBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Update active state on buttons
                viewBtns.forEach(b => b.classList.remove('active'));
                const targetBtn = e.target.closest('.view-btn');
                targetBtn.classList.add('active');

                // Apply class to mockup
                const view = targetBtn.dataset.view;
                deviceView.classList.remove('mobile', 'desktop');
                deviceView.classList.add(view);
            });
        });

        // 5. Deploy Button animation
        const deployBtn = document.querySelector('.deploy-btn');
        deployBtn.addEventListener('click', () => {
            deployBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Deploying...`;
            deployBtn.style.pointerEvents = 'none';
            
            setTimeout(() => {
                deployBtn.innerHTML = `<i class="fa-solid fa-check"></i> Deployed Successfully`;
                deployBtn.style.background = 'var(--success)';
                
                setTimeout(() => {
                    deployBtn.innerHTML = `<span><i class="fa-solid fa-rocket"></i> Deploy Portal</span>`;
                    deployBtn.style.background = ''; // reset to gradient
                    deployBtn.style.pointerEvents = 'auto';
                }, 2000);
            }, 1500);
        });
    }

    function triggerThemeChange(color) {
        state.theme = color;
        // Update UI
        colorSwatches.forEach(s => {
            s.classList.toggle('active', s.dataset.color === color);
        });
    }

    // Fire it up
    init();

});
