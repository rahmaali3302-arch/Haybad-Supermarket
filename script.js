/**
 * ==============================================================================
 * HOSPITAL MANAGEMENT SYSTEM - JAVASCRIPT (script.js)
 * Magaca Nidaamka: Nidaamka Maamulka Isbitaalka (Hospital Management System)
 * Luuqadda: Af-Soomaali
 * Kaydinta: localStorage
 * ==============================================================================
 */

// Sug inta DOM-ku si buuxda u furmayo
document.addEventListener('DOMContentLoaded', () => {
    initHospitalApp();
});

/* ==========================================================================
   1. KEYDADKA IYO XOGTA HORDHACA AH (DEFAULT MOCK DATA)
   ========================================================================== */

// Xogta tusaalaha ah ee Bukaannada
const DEFAULT_PATIENTS = [
    {
        id: 'pat-1',
        name: 'Cabdi Maxamuud Jaamac',
        age: 34,
        gender: 'Lab',
        phone: '0615123456',
        address: 'Hodan, Muqdisho',
        createdAt: '2026-10-20'
    },
    {
        id: 'pat-2',
        name: 'Deeqa Xasan Warsame',
        age: 27,
        gender: 'Dheddig',
        phone: '0617987654',
        address: 'Wadajir, Muqdisho',
        createdAt: '2026-10-21'
    },
    {
        id: 'pat-3',
        name: 'Liibaan Cabdiraxmaan Cali',
        age: 45,
        gender: 'Lab',
        phone: '0618334455',
        address: 'Yaaqshiid, Muqdisho',
        createdAt: '2026-10-22'
    },
    {
        id: 'pat-4',
        name: 'Safiyo Cismaan Maxamed',
        age: 5,
        gender: 'Dheddig',
        phone: '0612112233',
        address: 'Howlwadaag, Muqdisho',
        createdAt: '2026-10-23'
    },
    {
        id: 'pat-5',
        name: 'Farxaan Nuur Cilmi',
        age: 52,
        gender: 'Lab',
        phone: '0619556677',
        address: 'Kaxda, Muqdisho',
        createdAt: '2026-10-24'
    }
];

// Xogta Dhakhaatiirta Isbitaalka (Sida ku xusan shuruudaha qodobka 4-aad)
const DEFAULT_DOCTORS = [
    {
        id: 'doc-1',
        name: 'Dr. Axmed Cabdi',
        specialty: 'Dhakhtarka Guud',
        department: 'Guud',
        icon: 'fa-user-doctor',
        phone: '0615000111',
        experience: '10 Sano oo Khibrad ah',
        hours: 'Sabti - Khamiis: 8:00 Subaxnimo - 2:00 Duhurnimo',
        room: 'Qolka 101'
    },
    {
        id: 'doc-2',
        name: 'Dr. Aamina Cali',
        specialty: 'Dhakhtarka Carruurta',
        department: 'Carruurta',
        icon: 'fa-baby',
        phone: '0615000222',
        experience: '8 Sano oo Khibrad ah',
        hours: 'Sabti - Khamiis: 9:00 Subaxnimo - 3:00 Galabnimo',
        room: 'Qolka 204'
    },
    {
        id: 'doc-3',
        name: 'Dr. Maxamed Xasan',
        specialty: 'Dhakhtarka Wadnaha',
        department: 'Wadnaha',
        icon: 'fa-heart-pulse',
        phone: '0615000333',
        experience: '14 Sano oo Khibrad ah',
        hours: 'Isniin - Arbaco: 10:00 Subaxnimo - 4:00 Galabnimo',
        room: 'Qolka 305'
    },
    {
        id: 'doc-4',
        name: 'Dr. Faadumo Cumar',
        specialty: 'Dhakhtarka Haweenka',
        department: 'Haweenka',
        icon: 'fa-person-dress',
        phone: '0615000444',
        experience: '12 Sano oo Khibrad ah',
        hours: 'Sabti - Khamiis: 8:30 Subaxnimo - 2:30 Duhurnimo',
        room: 'Qolka 112'
    },
    {
        id: 'doc-5',
        name: 'Dr. Cabdiraxmaan Nuur',
        specialty: 'Dhakhtarka Lafaha',
        department: 'Lafaha',
        icon: 'fa-bone',
        phone: '0615000555',
        experience: '9 Sano oo Khibrad ah',
        hours: 'Axad - Khamiis: 8:00 Subaxnimo - 1:00 Duhurnimo',
        room: 'Qolka 108'
    },
    {
        id: 'doc-6',
        name: 'Dr. Sahra Ibraahim',
        specialty: 'Dhakhtarka Indhaha',
        department: 'Indhaha',
        icon: 'fa-eye',
        phone: '0615000666',
        experience: '7 Sano oo Khibrad ah',
        hours: 'Sabti - Arbaco: 9:00 Subaxnimo - 2:00 Duhurnimo',
        room: 'Qolka 202'
    }
];

// Qaybaha Isbitaalka (Departments)
const HOSPITAL_DEPARTMENTS = [
    {
        id: 'dep-1',
        name: 'Qaybta Degdegga ah (Emergency)',
        description: 'Adeeg degdeg ah 24 saac oo loogu talagalay bukaannada xaaladaha daran iyo shilalka.',
        icon: 'fa-truck-medical',
        head: 'Dr. Axmed Cabdi',
        beds: '25 Sariirood',
        room: 'Dabaqa 1-aad'
    },
    {
        id: 'dep-2',
        name: 'Qaybta Caafimaadka Guud',
        description: 'Baaritaanka iyo daweynta xanuunnada guud ee dadka waaweyn iyo baaritaannada joogtada ah.',
        icon: 'fa-stethoscope',
        head: 'Dr. Axmed Cabdi',
        beds: '40 Sariirood',
        room: 'Dabaqa 1-aad'
    },
    {
        id: 'dep-3',
        name: 'Qaybta Carruurta (Pediatrics)',
        description: 'Daryeelka gaarka ah ee carruurta laga bilaabo dhalashada ilaa qaan-gaarnimada.',
        icon: 'fa-baby',
        head: 'Dr. Aamina Cali',
        beds: '30 Sariirood',
        room: 'Dabaqa 2-aad'
    },
    {
        id: 'dep-4',
        name: 'Qaybta Wadnaha (Cardiology)',
        description: 'Baarista wadnaha, cadaadiska dhiigga, ECG iyo daweynta xanuunnada wareegga dhiigga.',
        icon: 'fa-heart-pulse',
        head: 'Dr. Maxamed Xasan',
        beds: '20 Sariirood',
        room: 'Dabaqa 3-aad'
    },
    {
        id: 'dep-5',
        name: 'Qaybta Haweenka & Dhalmada',
        description: 'Xannaanada hooyada uurka leh, dhalmada iyo xanuunnada guud ee haweenka.',
        icon: 'fa-female',
        head: 'Dr. Faadumo Cumar',
        beds: '35 Sariirood',
        room: 'Dabaqa 2-aad'
    },
    {
        id: 'dep-6',
        name: 'Qaybta Qalliinka & Lafaha',
        description: 'Qalliimada guud, kabidda jabniinka lafaha iyo baxnaaninta bukaanka.',
        icon: 'fa-bone',
        head: 'Dr. Cabdiraxmaan Nuur',
        beds: '25 Sariirood',
        room: 'Dabaqa 3-aad'
    }
];

// Xogta tusaalaha ah ee Ballamaha
const DEFAULT_APPOINTMENTS = [
    {
        id: 'apt-1',
        patientName: 'Cabdi Maxamuud Jaamac',
        doctorName: 'Dr. Axmed Cabdi (Dhakhtarka Guud)',
        date: '2026-10-26',
        time: '09:30',
        reason: 'Baaris guud iyo madax-xanuun joogto ah',
        status: 'Sugaya'
    },
    {
        id: 'apt-2',
        patientName: 'Safiyo Cismaan Maxamed',
        doctorName: 'Dr. Aamina Cali (Dhakhtarka Carruurta)',
        date: '2026-10-25',
        time: '10:00',
        reason: 'Qandho daran iyo qufac carruurta',
        status: 'La Xaqiijiyey'
    },
    {
        id: 'apt-3',
        patientName: 'Farxaan Nuur Cilmi',
        doctorName: 'Dr. Maxamed Xasan (Dhakhtarka Wadnaha)',
        date: '2026-10-27',
        time: '11:15',
        reason: 'Xanuun xabadka ah iyo cadaadiska dhiigga',
        status: 'Sugaya'
    },
    {
        id: 'apt-4',
        patientName: 'Deeqa Xasan Warsame',
        doctorName: 'Dr. Faadumo Cumar (Dhakhtarka Haweenka)',
        date: '2026-10-24',
        time: '08:45',
        reason: 'Baaritaanka joogtada ah ee uurka',
        status: 'Dhameystiran'
    }
];

// Xogta tusaalaha ah ee Biilasha & Lacag-bixinta Bukaannada (Patient Billing)
const DEFAULT_BILLINGS = [
    {
        id: 'bill-1',
        receiptNumber: 'INV-1001',
        patientName: 'Cabdi Maxamuud Jaamac',
        service: 'Baaris Guud',
        amount: 250,
        paymentMethod: 'EVC Plus',
        date: '2026-10-22',
        status: 'La Bixiyey',
        notes: 'Baaritaan guud iyo dawooyinka dhiig-karka'
    },
    {
        id: 'bill-2',
        receiptNumber: 'INV-1002',
        patientName: 'Deeqa Xasan Warsame',
        service: 'Dhalmada & Haweenka',
        amount: 850,
        paymentMethod: 'Kaash (Cash)',
        date: '2026-10-23',
        status: 'La Bixiyey',
        notes: 'Qalliinka dhalmada iyo qolka jiifka'
    },
    {
        id: 'bill-3',
        receiptNumber: 'INV-1003',
        patientName: 'Liibaan Cabdiraxmaan Cali',
        service: 'Qalliinka Lafaha',
        amount: 1400,
        paymentMethod: 'Kaadhka Bangiga',
        date: '2026-10-23',
        status: 'La Bixiyey',
        notes: 'Qalliinka jabniinka garabka iyo dawooyin'
    },
    {
        id: 'bill-4',
        receiptNumber: 'INV-1004',
        patientName: 'Safiyo Cismaan Maxamed',
        service: 'Daryeelka Carruurta',
        amount: 450,
        paymentMethod: 'EVC Plus',
        date: '2026-10-24',
        status: 'La Bixiyey',
        notes: 'Baaris shaybaar iyo daweynta carruurta'
    },
    {
        id: 'bill-5',
        receiptNumber: 'INV-1005',
        patientName: 'Farxaan Nuur Cilmi',
        service: 'Baaritaanka Wadnaha',
        amount: 750,
        paymentMethod: 'Zaad Service',
        date: '2026-10-24',
        status: 'La Bixiyey',
        notes: 'ECG, Echo iyo baaris dhammaystiran oo wadnaha ah'
    },
    {
        id: 'bill-6',
        receiptNumber: 'INV-1006',
        patientName: 'Sahra Maxamed Cigaal',
        service: 'Jiifka Sariirta',
        amount: 1150,
        paymentMethod: 'Sahal Service',
        date: '2026-10-24',
        status: 'La Bixiyey',
        notes: '5 maalmood oo jiif iyo daryeel gaar ah'
    },
    {
        id: 'bill-7',
        receiptNumber: 'INV-1007',
        patientName: 'Xuseen Barre Warsame',
        service: 'Degdegga (Emergency)',
        amount: 340,
        paymentMethod: 'EVC Plus',
        date: '2026-10-24',
        status: 'Sugaya',
        notes: 'Daryeel degdeg ah oo shil gaari, biilka qabyada ah'
    }
];

// Xogta tusaalaha ah ee Mushaharka Dhakhaatiirta (Doctor Payroll)
const DEFAULT_SALARIES = [
    {
        id: 'sal-1',
        slipId: 'SAL-2001',
        doctorName: 'Dr. Axmed Cabdi',
        specialty: 'Dhakhtarka Guud',
        month: 'Oktoobar 2026',
        baseAmount: 1200,
        bonusAmount: 150,
        totalAmount: 1350,
        paymentMethod: 'Xawaalad Bangi (Salaam / Premier)',
        date: '2026-10-24',
        status: 'La Bixiyay'
    },
    {
        id: 'sal-2',
        slipId: 'SAL-2002',
        doctorName: 'Dr. Aamina Cali',
        specialty: 'Dhakhtarka Carruurta',
        month: 'Oktoobar 2026',
        baseAmount: 1100,
        bonusAmount: 100,
        totalAmount: 1200,
        paymentMethod: 'Xawaalad Bangi (Salaam / Premier)',
        date: '2026-10-24',
        status: 'La Bixiyay'
    },
    {
        id: 'sal-3',
        slipId: 'SAL-2003',
        doctorName: 'Dr. Faadumo Cumar',
        specialty: 'Dhakhtarka Haweenka',
        month: 'Oktoobar 2026',
        baseAmount: 1300,
        bonusAmount: 200,
        totalAmount: 1500,
        paymentMethod: 'EVC Plus',
        date: '2026-10-23',
        status: 'La Bixiyay'
    },
    {
        id: 'sal-4',
        slipId: 'SAL-2004',
        doctorName: 'Dr. Maxamed Xasan',
        specialty: 'Dhakhtarka Wadnaha',
        month: 'Oktoobar 2026',
        baseAmount: 1400,
        bonusAmount: 0,
        totalAmount: 1400,
        paymentMethod: 'Xawaalad Bangi (Salaam / Premier)',
        date: '2026-10-25',
        status: 'Sugaya'
    }
];

/* ==========================================================================
   2. GLOBAL STATE IYO KEYDADKA LOCALSTORAGE
   ========================================================================== */
let patients = [];
let doctors = [];
let appointments = [];
let billings = [];
let salaries = [];
let deleteTarget = { type: null, id: null }; // Ku haynta waxa la rabo in la tirtiro

/**
 * Bilowga App-ka (Initialization)
 */
function initHospitalApp() {
    loadDataFromStorage();
    setupCurrentDate();
    setupNavigation();
    setupMobileSidebar();
    setupPatientForm();
    setupPatientSearch();
    setupAppointmentForm();
    setupAppointmentFilter();
    setupDoctorsFilter();
    setupBillingForm();
    setupBillingSearch();
    setupBillingFilter();
    setupSalaryForm();
    setupSalaryFilter();
    setupDeleteModal();
    setupResetButton();

    // Soo saar wax kasta
    renderAll();
}

/**
 * Ka soo qaadashada xogta localStorage
 */
function loadDataFromStorage() {
    // 1. Bukaannada
    const storedPatients = localStorage.getItem('hospital_patients');
    if (storedPatients) {
        try {
            patients = JSON.parse(storedPatients);
        } catch (e) {
            patients = [...DEFAULT_PATIENTS];
        }
    } else {
        patients = [...DEFAULT_PATIENTS];
        savePatientsToStorage();
    }

    // 2. Dhakhaatiirta
    const storedDoctors = localStorage.getItem('hospital_doctors');
    if (storedDoctors) {
        try {
            doctors = JSON.parse(storedDoctors);
        } catch (e) {
            doctors = [...DEFAULT_DOCTORS];
        }
    } else {
        doctors = [...DEFAULT_DOCTORS];
        saveDoctorsToStorage();
    }

    // 3. Ballamaha
    const storedAppointments = localStorage.getItem('hospital_appointments');
    if (storedAppointments) {
        try {
            appointments = JSON.parse(storedAppointments);
        } catch (e) {
            appointments = [...DEFAULT_APPOINTMENTS];
        }
    } else {
        appointments = [...DEFAULT_APPOINTMENTS];
        saveAppointmentsToStorage();
    }

    // 4. Biilasha & Lacag-bixinta Bukaanka
    const storedBillings = localStorage.getItem('hospital_billings');
    if (storedBillings) {
        try {
            billings = JSON.parse(storedBillings);
        } catch (e) {
            billings = [...DEFAULT_BILLINGS];
        }
    } else {
        billings = [...DEFAULT_BILLINGS];
        saveBillingsToStorage();
    }

    // 5. Mushaharka Dhakhaatiirta
    const storedSalaries = localStorage.getItem('hospital_salaries');
    if (storedSalaries) {
        try {
            salaries = JSON.parse(storedSalaries);
        } catch (e) {
            salaries = [...DEFAULT_SALARIES];
        }
    } else {
        salaries = [...DEFAULT_SALARIES];
        saveSalariesToStorage();
    }
}

function savePatientsToStorage() {
    localStorage.setItem('hospital_patients', JSON.stringify(patients));
}

function saveDoctorsToStorage() {
    localStorage.setItem('hospital_doctors', JSON.stringify(doctors));
}

function saveAppointmentsToStorage() {
    localStorage.setItem('hospital_appointments', JSON.stringify(appointments));
}

function saveBillingsToStorage() {
    localStorage.setItem('hospital_billings', JSON.stringify(billings));
}

function saveSalariesToStorage() {
    localStorage.setItem('hospital_salaries', JSON.stringify(salaries));
}

/**
 * Dib u soo saaridda xogta meel kasta (Re-render All)
 */
function renderAll() {
    updateDashboardStats();
    renderPatientsTable();
    populatePatientDatalist();
    populateDoctorSelectDropdown();
    populateSalaryDoctorDropdown();
    renderDoctorsGrid();
    renderAppointmentsTable();
    renderDepartmentsGrid();
    renderBillingsTable();
    renderSalariesTable();
    updateFinancialStats();
    renderRevenueBreakdown();
    renderDashboardRecentTables();
}

/* ==========================================================================
   3. TAARIIKHDA MAANTA & NAVIGATION (KALA GUURKA BOGAGGA)
   ========================================================================== */

function setupCurrentDate() {
    const liveDateEl = document.getElementById('liveDate');
    if (!liveDateEl) return;

    const maanta = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    
    // Habka taariikhda ee Soomaaliga
    const maalmaha = ['Axad', 'Isniin', 'Talaado', 'Arbaco', 'Khamiis', 'Jimce', 'Sabti'];
    const bilaha = [
        'Jannaayo', 'Febraayo', 'Maarso', 'Abriil', 'May', 'Juun',
        'Luuliyo', 'Ogosto', 'Sebtembar', 'Oktoobar', 'Nofembar', 'Diseembar'
    ];
    
    const maalinMagac = maalmaha[maanta.getDay()];
    const bilMagac = bilaha[maanta.getMonth()];
    const maalinTiro = maanta.getDate();
    const sanad = maanta.getFullYear();

    liveDateEl.textContent = `${maalinMagac}, ${maalinTiro} ${bilMagac} ${sanad}`;
}

function setupNavigation() {
    const menuItems = document.querySelectorAll('.sidebar-menu .menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = item.getAttribute('data-section');
            if (targetSection) {
                navigateTo(targetSection);
            }
        });
    });
}

function navigateTo(sectionId, openForm = false) {
    const allSections = document.querySelectorAll('.content-section');
    const menuItems = document.querySelectorAll('.sidebar-menu .menu-item');
    const pageTitle = document.getElementById('currentSectionTitle');

    allSections.forEach(sec => sec.classList.remove('active'));
    menuItems.forEach(item => item.classList.remove('active'));

    const activeSec = document.getElementById(sectionId);
    if (activeSec) {
        activeSec.classList.add('active');
    }

    const activeMenu = document.querySelector(`.sidebar-menu .menu-item[data-section="${sectionId}"]`);
    if (activeMenu) {
        activeMenu.classList.add('active');
    }

    // Cinwaanka sare
    const titles = {
        dashboardSection: 'Dashboard (Dulmar Guud)',
        patientsSection: 'Maamulka Bukaannada',
        doctorsSection: 'Qaybta Dhakhaatiirta',
        appointmentsSection: 'Qabsashada & Jadwalka Ballamaha',
        departmentsSection: 'Qaybaha & Waaxyaha Isbitaalka',
        billingSection: 'Maamulka Lacag-bixinta Bukaanka',
        payrollSection: 'Mushahar Qaadashada Dhakhaatiirta',
        financeSection: 'Xisaabaadka & Dakhliga Isbitaalka'
    };
    if (pageTitle && titles[sectionId]) {
        pageTitle.textContent = titles[sectionId];
    }

    // Haddii la rabo in foomka toos loo furo
    if (openForm) {
        if (sectionId === 'patientsSection') {
            openPatientForm();
        } else if (sectionId === 'appointmentsSection') {
            openAppointmentForm();
        } else if (sectionId === 'billingSection') {
            openBillingForm();
        } else if (sectionId === 'payrollSection') {
            openSalaryForm();
        }
    }

    // Haddii shaashad yar tahay xir sidebar-ka
    closeMobileSidebar();

    // Ku noqo dusha sare ee bogga
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Global navigateTo for inline onclick buttons
window.navigateTo = navigateTo;

function setupMobileSidebar() {
    const toggleBtn = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    if (toggleBtn && sidebar && overlay) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('active');
        });

        overlay.addEventListener('click', () => {
            closeMobileSidebar();
        });
    }
}

function closeMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar && overlay) {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    }
}

/* ==========================================================================
   4. DASHBOARD FUNCTIONS (DULMARKA GUUD)
   ========================================================================== */

function updateDashboardStats() {
    const totalPatientsEl = document.getElementById('statTotalPatients');
    const totalDoctorsEl = document.getElementById('statTotalDoctors');
    const totalAppointmentsEl = document.getElementById('statTotalAppointments');
    const totalDepartmentsEl = document.getElementById('statTotalDepartments');

    const patientCountBadge = document.getElementById('patientCountBadge');
    const doctorsBadgeCount = document.getElementById('doctorsBadgeCount');
    const appointmentsCountBadge = document.getElementById('appointmentsCountBadge');
    const departmentsBadgeCount = document.getElementById('departmentsBadgeCount');

    if (totalPatientsEl) totalPatientsEl.textContent = patients.length;
    if (patientCountBadge) patientCountBadge.textContent = patients.length;

    if (totalDoctorsEl) totalDoctorsEl.textContent = doctors.length;
    if (doctorsBadgeCount) doctorsBadgeCount.textContent = doctors.length;

    if (totalAppointmentsEl) totalAppointmentsEl.textContent = appointments.length;
    if (appointmentsCountBadge) appointmentsCountBadge.textContent = appointments.length;

    if (totalDepartmentsEl) totalDepartmentsEl.textContent = HOSPITAL_DEPARTMENTS.length;
    if (departmentsBadgeCount) departmentsBadgeCount.textContent = HOSPITAL_DEPARTMENTS.length;
}

function renderDashboardRecentTables() {
    // 1. Recent Patients (4-tii ugu dambeeyay)
    const recentPatientsTbody = document.getElementById('dashRecentPatientsBody');
    if (recentPatientsTbody) {
        recentPatientsTbody.innerHTML = '';
        const recent = [...patients].reverse().slice(0, 4);

        if (recent.length === 0) {
            recentPatientsTbody.innerHTML = `<tr><td colspan="4" class="text-center" style="padding: 20px; color: var(--text-secondary);">Wali ma jiro bukaan diiwaangashan.</td></tr>`;
        } else {
            recent.forEach(p => {
                const tr = document.createElement('tr');
                const genderBadge = p.gender === 'Lab' 
                    ? `<span class="badge badge-gender-lab"><i class="fa-solid fa-mars"></i> Lab</span>`
                    : `<span class="badge badge-gender-dheddig"><i class="fa-solid fa-venus"></i> Dheddig</span>`;

                tr.innerHTML = `
                    <td><strong>${escapeHtml(p.name)}</strong></td>
                    <td>${p.age} jir</td>
                    <td>${genderBadge}</td>
                    <td>${escapeHtml(p.phone)}</td>
                `;
                recentPatientsTbody.appendChild(tr);
            });
        }
    }

    // 2. Recent Appointments (4-tii ugu dambeeyay)
    const recentAppointmentsTbody = document.getElementById('dashRecentAppointmentsBody');
    if (recentAppointmentsTbody) {
        recentAppointmentsTbody.innerHTML = '';
        const recentApts = [...appointments].reverse().slice(0, 4);

        if (recentApts.length === 0) {
            recentAppointmentsTbody.innerHTML = `<tr><td colspan="4" class="text-center" style="padding: 20px; color: var(--text-secondary);">Wali ma jiraan ballamo la qabsaday.</td></tr>`;
        } else {
            recentApts.forEach(a => {
                const tr = document.createElement('tr');
                let statusBadge = `<span class="badge badge-status-sugaya">${escapeHtml(a.status)}</span>`;
                if (a.status === 'La Xaqiijiyey') {
                    statusBadge = `<span class="badge badge-status-xaqiijiyey"><i class="fa-solid fa-circle-check"></i> ${escapeHtml(a.status)}</span>`;
                } else if (a.status === 'Dhameystiran') {
                    statusBadge = `<span class="badge badge-status-dhameystiran"><i class="fa-solid fa-check-double"></i> ${escapeHtml(a.status)}</span>`;
                }

                // Soo koob magaca dhakhtarka
                const shortDoc = a.doctorName.split('(')[0] || a.doctorName;

                tr.innerHTML = `
                    <td><strong>${escapeHtml(a.patientName)}</strong></td>
                    <td>${escapeHtml(shortDoc)}</td>
                    <td><small>${escapeHtml(a.date)} (${escapeHtml(a.time)})</small></td>
                    <td>${statusBadge}</td>
                `;
                recentAppointmentsTbody.appendChild(tr);
            });
        }
    }
}

/* ==========================================================================
   5. BUKAANNADA (PATIENT REGISTRATION, EDIT, DELETE & VALIDATION)
   ========================================================================== */

function setupPatientForm() {
    const toggleBtn = document.getElementById('btnTogglePatientForm');
    const closeBtn = document.getElementById('btnClosePatientForm');
    const cancelEditBtn = document.getElementById('btnCancelPatientEdit');
    const form = document.getElementById('patientForm');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const container = document.getElementById('patientFormContainer');
            if (container.classList.contains('open')) {
                closePatientForm();
            } else {
                openPatientForm();
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closePatientForm);
    }

    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', resetPatientForm);
    }

    if (form) {
        form.addEventListener('submit', handlePatientSubmit);
    }
}

function openPatientForm() {
    const container = document.getElementById('patientFormContainer');
    if (container) {
        container.classList.add('open');
        document.getElementById('patientName').focus();
    }
}

function closePatientForm() {
    const container = document.getElementById('patientFormContainer');
    if (container) {
        container.classList.remove('open');
        resetPatientForm();
    }
}

function resetPatientForm() {
    const form = document.getElementById('patientForm');
    if (form) {
        form.reset();
        document.getElementById('patientEditId').value = '';
        document.getElementById('patientFormTitle').textContent = 'Diiwaangelinta Bukaanka Cusub';
        
        const submitBtn = document.getElementById('btnSubmitPatient');
        submitBtn.innerHTML = '<i class="fa-solid fa-user-plus"></i> Diiwaangeli Bukaanka';

        const cancelBtn = document.getElementById('btnCancelPatientEdit');
        if (cancelBtn) cancelBtn.style.display = 'none';

        clearFormErrors('patientForm');
    }
}

/**
 * Hubinta foomka diiwaangelinta bukaanka (Validation & Submission)
 */
function handlePatientSubmit(e) {
    e.preventDefault();
    clearFormErrors('patientForm');

    const editId = document.getElementById('patientEditId').value.trim();
    const nameInput = document.getElementById('patientName');
    const ageInput = document.getElementById('patientAge');
    const genderInput = document.getElementById('patientGender');
    const phoneInput = document.getElementById('patientPhone');
    const addressInput = document.getElementById('patientAddress');

    const name = nameInput.value.trim();
    const age = parseInt(ageInput.value, 10);
    const gender = genderInput.value.trim();
    const phone = phoneInput.value.trim();
    const address = addressInput.value.trim();

    let isValid = true;

    // 1. Hubinta Magaca
    if (!name) {
        showFieldError('patientNameError', 'Fadlan geli magaca bukaanka oo buuxa.');
        nameInput.classList.add('is-invalid');
        isValid = false;
    } else if (name.length < 3) {
        showFieldError('patientNameError', 'Magacu waa inuu ka koobnaadaa ugu yaraan 3 xaraf.');
        nameInput.classList.add('is-invalid');
        isValid = false;
    }

    // 2. Hubinta Da'da
    if (isNaN(age) || ageInput.value.trim() === '') {
        showFieldError('patientAgeError', 'Fadlan geli da\'da bukaanka.');
        ageInput.classList.add('is-invalid');
        isValid = false;
    } else if (age < 1 || age > 120) {
        showFieldError('patientAgeError', 'Fadlan geli da\' macquul ah (1 ilaa 120 sano).');
        ageInput.classList.add('is-invalid');
        isValid = false;
    }

    // 3. Hubinta Jinsiga
    if (!gender) {
        showFieldError('patientGenderError', 'Fadlan dooro jinsiga bukaanka (Lab ama Dheddig).');
        genderInput.classList.add('is-invalid');
        isValid = false;
    }

    // 4. Hubinta Lambarka Telefoonka
    // Aqbal lambarrada Soomaaliya (tusaale: 061..., 062..., 068..., 252..., ama ugu yaraan 7 tiro)
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{3,6}$/;
    if (!phone) {
        showFieldError('patientPhoneError', 'Fadlan geli lambarka telefoonka bukaanka.');
        phoneInput.classList.add('is-invalid');
        isValid = false;
    } else if (!phoneRegex.test(phone.replace(/\s+/g, '')) || phone.replace(/\D/g, '').length < 7) {
        showFieldError('patientPhoneError', 'Fadlan geli lambar telefoon oo sax ah (ugu yaraan 7 lambar, tusaale: 0612345678).');
        phoneInput.classList.add('is-invalid');
        isValid = false;
    }

    // 5. Hubinta Cinwaanka
    if (!address) {
        showFieldError('patientAddressError', 'Fadlan geli cinwaanka bukaanka (Degmada / Xaafadda).');
        addressInput.classList.add('is-invalid');
        isValid = false;
    }

    if (!isValid) {
        showToast('Fadlan si sax ah u buuxi dhammaan meelaha muhiimka ah!', 'error');
        return;
    }

    // Haddii aan wax ka beddelayno bukaan hore (Edit Mode)
    if (editId) {
        const index = patients.findIndex(p => p.id === editId);
        if (index !== -1) {
            patients[index] = {
                ...patients[index],
                name,
                age,
                gender,
                phone,
                address,
                updatedAt: new Date().toISOString()
            };
            savePatientsToStorage();
            renderAll();
            closePatientForm();
            showToast(`Xogta bukaanka "${name}" si guul leh ayaa loo cusboonaysiiyey!`, 'success');
        }
    } else {
        // Ku darista bukaan cusub (New Patient)
        const newPatient = {
            id: 'pat-' + Date.now(),
            name,
            age,
            gender,
            phone,
            address,
            createdAt: new Date().toISOString().split('T')[0]
        };

        patients.unshift(newPatient); // Ka dhig kan ugu horreeya
        savePatientsToStorage();
        renderAll();
        closePatientForm();
        showToast(`Bukaanka "${name}" si guul leh ayaa loo diiwaangeliyey!`, 'success');
    }
}

/**
 * Diyaarinta foomka wax-ka-beddelka bukaanka (Edit Patient)
 */
function editPatient(patientId) {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) return;

    openPatientForm();

    document.getElementById('patientEditId').value = patient.id;
    document.getElementById('patientName').value = patient.name;
    document.getElementById('patientAge').value = patient.age;
    document.getElementById('patientGender').value = patient.gender;
    document.getElementById('patientPhone').value = patient.phone;
    document.getElementById('patientAddress').value = patient.address;

    document.getElementById('patientFormTitle').textContent = `Wax Ka Beddelka: ${patient.name}`;
    const submitBtn = document.getElementById('btnSubmitPatient');
    submitBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Cusboonaysii Bukaanka';

    const cancelBtn = document.getElementById('btnCancelPatientEdit');
    if (cancelBtn) cancelBtn.style.display = 'inline-flex';

    // Scroll to form smoothly
    document.getElementById('patientFormContainer').scrollIntoView({ behavior: 'smooth' });
}

// Global functions for inline action buttons
window.editPatient = editPatient;
window.confirmDeletePatient = function(patientId) {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) return;

    openDeleteModal('patient', patient.id, `Ma hubtaa inaad tirtirto xogta bukaanka "${patient.name}"? Ficilkan dib looma soo celin karo.`);
};

/**
 * Soo saaridda shaxda bukaannada (Render Patients Table)
 */
function renderPatientsTable(filterList = null) {
    const tbody = document.getElementById('patientsTableBody');
    const emptyState = document.getElementById('noPatientsMessage');
    const table = document.getElementById('patientsTable');

    if (!tbody) return;

    const listToRender = filterList !== null ? filterList : patients;
    tbody.innerHTML = '';

    if (listToRender.length === 0) {
        if (emptyState) emptyState.style.display = 'block';
        if (table) table.style.display = 'none';
        return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (table) table.style.display = 'table';

    listToRender.forEach((patient, index) => {
        const tr = document.createElement('tr');

        const genderBadge = patient.gender === 'Lab'
            ? `<span class="badge badge-gender-lab"><i class="fa-solid fa-mars"></i> Lab</span>`
            : `<span class="badge badge-gender-dheddig"><i class="fa-solid fa-venus"></i> Dheddig</span>`;

        tr.innerHTML = `
            <td><strong>#${index + 1}</strong></td>
            <td>
                <strong>${escapeHtml(patient.name)}</strong>
            </td>
            <td>${patient.age} sano</td>
            <td>${genderBadge}</td>
            <td>
                <a href="tel:${escapeHtml(patient.phone)}" style="color: var(--primary); text-decoration: underline;">
                    <i class="fa-solid fa-phone" style="font-size: 0.8rem; margin-right: 4px;"></i>${escapeHtml(patient.phone)}
                </a>
            </td>
            <td>${escapeHtml(patient.address)}</td>
            <td class="text-center">
                <div class="cell-actions">
                    <button class="btn-action btn-action-edit" title="Wax ka beddel" onclick="editPatient('${patient.id}')">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="btn-action btn-action-delete" title="Tirtir bukaanka" onclick="confirmDeletePatient('${patient.id}')">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

/**
 * Raadinta Bukaanka (Search by Name or Phone)
 */
function setupPatientSearch() {
    const searchInput = document.getElementById('patientSearchInput');
    const clearBtn = document.getElementById('btnClearSearch');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();

            if (clearBtn) {
                clearBtn.style.display = query.length > 0 ? 'block' : 'none';
            }

            if (!query) {
                renderPatientsTable();
                return;
            }

            const filtered = patients.filter(p => {
                const nameMatch = p.name.toLowerCase().includes(query);
                const phoneMatch = p.phone.toLowerCase().includes(query);
                const addressMatch = p.address.toLowerCase().includes(query);
                return nameMatch || phoneMatch || addressMatch;
            });

            renderPatientsTable(filtered);
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (searchInput) {
                searchInput.value = '';
                searchInput.focus();
            }
            clearBtn.style.display = 'none';
            renderPatientsTable();
        });
    }
}

/**
 * Bukaannada loogu talagalay autocomplete marka ballan la qabanayo
 */
function populatePatientDatalist() {
    const datalist = document.getElementById('patientListDatalist');
    if (!datalist) return;

    datalist.innerHTML = '';
    patients.forEach(p => {
        const option = document.createElement('option');
        option.value = p.name;
        option.textContent = `Taleefon: ${p.phone} - ${p.gender}`;
        datalist.appendChild(option);
    });
}

/* ==========================================================================
   6. DHAKHAATIIRTA (DOCTORS DIRECTORY & FILTERING)
   ========================================================================== */

function populateDoctorSelectDropdown() {
    const select = document.getElementById('appointmentDoctorSelect');
    if (!select) return;

    select.innerHTML = '<option value="">-- Dooro Dhakhtarka --</option>';
    doctors.forEach(doc => {
        const opt = document.createElement('option');
        opt.value = `${doc.name} (${doc.specialty})`;
        opt.textContent = `${doc.name} — ${doc.specialty}`;
        select.appendChild(opt);
    });
}

function renderDoctorsGrid(filter = 'all') {
    const container = document.getElementById('doctorsGridContainer');
    if (!container) return;

    container.innerHTML = '';

    const list = filter === 'all' 
        ? doctors 
        : doctors.filter(d => d.department.toLowerCase() === filter.toLowerCase() || d.specialty.toLowerCase().includes(filter.toLowerCase()));

    if (list.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <i class="fa-solid fa-user-doctor empty-icon"></i>
                <h3>Ma jiro dhakhtar la helay</h3>
                <p>Ma jiro dhakhtar ku jira qaybta aad dooratay hadda.</p>
            </div>
        `;
        return;
    }

    list.forEach(doc => {
        const card = document.createElement('div');
        card.className = 'doctor-card';

        card.innerHTML = `
            <div class="doctor-avatar-box">
                <i class="fa-solid ${doc.icon || 'fa-user-doctor'}"></i>
            </div>
            <h3>${escapeHtml(doc.name)}</h3>
            <span class="doctor-specialty">${escapeHtml(doc.specialty)}</span>
            
            <ul class="doctor-details-list">
                <li><i class="fa-solid fa-award"></i> <span>${escapeHtml(doc.experience)}</span></li>
                <li><i class="fa-solid fa-door-open"></i> <span>${escapeHtml(doc.room)}</span></li>
                <li><i class="fa-solid fa-clock"></i> <span>${escapeHtml(doc.hours)}</span></li>
                <li><i class="fa-solid fa-phone"></i> <span>${escapeHtml(doc.phone)}</span></li>
            </ul>

            <button class="btn btn-primary" onclick="quickBookDoctor('${escapeHtml(doc.name)} (${escapeHtml(doc.specialty)}')">
                <i class="fa-regular fa-calendar-check"></i> Ballan la qabso
            </button>
        `;

        container.appendChild(card);
    });
}

/* ==========================================================================
   9. LACAG-BIXINTA BUKAANKA (PATIENT BILLING & INVOICING)
   ========================================================================== */

function setupBillingForm() {
    const toggleBtn = document.getElementById('btnToggleBillingForm');
    const closeBtn = document.getElementById('btnCloseBillingForm');
    const cancelBtn = document.getElementById('btnCancelBillingEdit');
    const form = document.getElementById('billingForm');
    const serviceSelect = document.getElementById('billingServiceSelect');
    const amountInput = document.getElementById('billingAmount');
    const dateInput = document.getElementById('billingDate');

    // Taariikhda maanta geli sida default
    if (dateInput) {
        dateInput.value = new Date().toISOString().split('T')[0];
    }

    // Marka adeegga la doorto, si toos ah u soo saar qiimaha caadiga ah
    if (serviceSelect && amountInput) {
        serviceSelect.addEventListener('change', () => {
            const selectedOpt = serviceSelect.options[serviceSelect.selectedIndex];
            const price = selectedOpt ? selectedOpt.getAttribute('data-price') : null;
            if (price && Number(price) > 0) {
                amountInput.value = price;
            } else if (selectedOpt && selectedOpt.value === 'Adeeg Kale') {
                amountInput.value = '';
                amountInput.placeholder = 'Geli qadarka lacagta...';
                amountInput.focus();
            }
        });
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const container = document.getElementById('billingFormContainer');
            if (container.classList.contains('open')) {
                closeBillingForm();
            } else {
                openBillingForm();
            }
        });
    }

    if (closeBtn) closeBtn.addEventListener('click', closeBillingForm);
    if (cancelBtn) cancelBtn.addEventListener('click', resetBillingForm);
    if (form) form.addEventListener('submit', handleBillingSubmit);
}

function openBillingForm() {
    const container = document.getElementById('billingFormContainer');
    if (container) {
        container.classList.add('open');
        const patientInput = document.getElementById('billingPatientName');
        if (patientInput) patientInput.focus();
    }
}
window.openBillingForm = openBillingForm;

function closeBillingForm() {
    const container = document.getElementById('billingFormContainer');
    if (container) {
        container.classList.remove('open');
        resetBillingForm();
    }
}

function resetBillingForm() {
    const form = document.getElementById('billingForm');
    if (form) {
        form.reset();
        document.getElementById('billingEditId').value = '';
        document.getElementById('billingFormTitle').textContent = 'Foomka Diiwaangelinta Lacag-bixinta';
        
        const submitBtn = document.getElementById('btnSubmitBilling');
        submitBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Diiwaangeli Lacag-bixinta';

        const cancelBtn = document.getElementById('btnCancelBillingEdit');
        if (cancelBtn) cancelBtn.style.display = 'none';

        const dateInput = document.getElementById('billingDate');
        if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];

        clearFormErrors('billingForm');
    }
}

function handleBillingSubmit(e) {
    e.preventDefault();
    clearFormErrors('billingForm');

    const editId = document.getElementById('billingEditId').value.trim();
    const patientNameInput = document.getElementById('billingPatientName');
    const serviceSelect = document.getElementById('billingServiceSelect');
    const amountInput = document.getElementById('billingAmount');
    const methodSelect = document.getElementById('billingMethod');
    const dateInput = document.getElementById('billingDate');
    const statusSelect = document.getElementById('billingStatus');
    const notesInput = document.getElementById('billingNotes');

    const patientName = patientNameInput.value.trim();
    const service = serviceSelect.value.trim();
    const amount = parseFloat(amountInput.value);
    const paymentMethod = methodSelect.value.trim();
    const date = dateInput.value.trim();
    const status = statusSelect.value.trim();
    const notes = notesInput ? notesInput.value.trim() : '';

    let isValid = true;

    if (!patientName) {
        showFieldError('billingPatientNameError', 'Fadlan geli magaca bukaanka lacagta laga qabanayo.');
        patientNameInput.classList.add('is-invalid');
        isValid = false;
    }

    if (!service) {
        showFieldError('billingServiceError', 'Fadlan dooro nooca adeegga caafimaadka.');
        serviceSelect.classList.add('is-invalid');
        isValid = false;
    }

    if (isNaN(amount) || amount <= 0) {
        showFieldError('billingAmountError', 'Fadlan geli qadar lacag oo sax ah (ugu yaraan $1).');
        amountInput.classList.add('is-invalid');
        isValid = false;
    }

    if (!paymentMethod) {
        showFieldError('billingMethodError', 'Fadlan dooro habka lacag-bixinta.');
        methodSelect.classList.add('is-invalid');
        isValid = false;
    }

    if (!date) {
        showFieldError('billingDateError', 'Fadlan dooro taariikhda lacag-bixinta.');
        dateInput.classList.add('is-invalid');
        isValid = false;
    }

    if (!isValid) {
        showToast('Fadlan si sax ah u buuxi xogta lacag-bixinta!', 'error');
        return;
    }

    if (editId) {
        const index = billings.findIndex(b => b.id === editId);
        if (index !== -1) {
            billings[index] = {
                ...billings[index],
                patientName,
                service,
                amount,
                paymentMethod,
                date,
                status,
                notes,
                updatedAt: new Date().toISOString()
            };
            saveBillingsToStorage();
            renderAll();
            closeBillingForm();
            showToast(`Biilka #${billings[index].receiptNumber} si guul leh ayaa loo cusboonaysiiyey!`, 'success');
        }
    } else {
        const receiptNumber = 'INV-' + Math.floor(1000 + Math.random() * 9000);
        const newBilling = {
            id: 'bill-' + Date.now(),
            receiptNumber,
            patientName,
            service,
            amount,
            paymentMethod,
            date,
            status,
            notes,
            createdAt: new Date().toISOString()
        };

        billings.unshift(newBilling);
        saveBillingsToStorage();
        renderAll();
        closeBillingForm();
        showToast(`Lacag-bixinta bukaanka "${patientName}" ($${amount.toFixed(2)}) si guul leh ayaa loo diiwaangeliyey!`, 'success');
    }
}

function renderBillingsTable(filterList = null) {
    const tbody = document.getElementById('billingsTableBody');
    const emptyState = document.getElementById('noBillingsMessage');
    const table = document.getElementById('billingsTable');
    const badge = document.getElementById('billingCountBadge');

    if (!tbody) return;

    const list = filterList !== null ? filterList : billings;
    if (badge) badge.textContent = billings.length;

    tbody.innerHTML = '';

    if (list.length === 0) {
        if (emptyState) emptyState.style.display = 'block';
        if (table) table.style.display = 'none';
        return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (table) table.style.display = 'table';

    list.forEach(item => {
        const tr = document.createElement('tr');

        let statusBadge = item.status === 'La Bixiyey'
            ? `<span class="badge badge-status-xaqiijiyey"><i class="fa-solid fa-circle-check"></i> La Bixiyey</span>`
            : `<span class="badge badge-status-sugaya"><i class="fa-solid fa-clock"></i> Sugaya</span>`;

        tr.innerHTML = `
            <td><strong style="color: var(--primary); font-family: monospace;">${escapeHtml(item.receiptNumber)}</strong></td>
            <td><strong>${escapeHtml(item.patientName)}</strong></td>
            <td><span class="badge" style="background-color: var(--primary-subtle); color: var(--primary);">${escapeHtml(item.service)}</span></td>
            <td><strong style="color: #047857; font-size: 1rem;">$${item.amount.toFixed(2)}</strong></td>
            <td><small><i class="fa-solid fa-credit-card" style="color: var(--text-muted); margin-right: 4px;"></i>${escapeHtml(item.paymentMethod)}</small></td>
            <td><small>${escapeHtml(item.date)}</small></td>
            <td>${statusBadge}</td>
            <td class="text-center">
                <div class="cell-actions">
                    <button class="btn-action" style="background-color: #dbeafe; color: #1e40af;" title="Arag & Daabac Rasiidka" onclick="openReceiptModal('${item.id}')">
                        <i class="fa-solid fa-print"></i>
                    </button>
                    ${item.status === 'Sugaya' ? `
                        <button class="btn-action btn-action-status" title="Ka dhig mid La Bixiyey" onclick="updateBillingStatus('${item.id}', 'La Bixiyey')">
                            <i class="fa-solid fa-check"></i>
                        </button>
                    ` : ''}
                    <button class="btn-action btn-action-delete" title="Tirtir biilka" onclick="confirmDeleteBilling('${item.id}')">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

function updateBillingStatus(id, newStatus) {
    const item = billings.find(b => b.id === id);
    if (!item) return;

    item.status = newStatus;
    saveBillingsToStorage();
    renderAll();
    showToast(`Biilka #${item.receiptNumber} waxaa laga dhigay: "${newStatus}"!`, 'info');
}
window.updateBillingStatus = updateBillingStatus;

function confirmDeleteBilling(id) {
    const item = billings.find(b => b.id === id);
    if (!item) return;

    openDeleteModal('billing', item.id, `Ma hubtaa inaad tirtirto biilka #${item.receiptNumber} ee bukaanka "${item.patientName}" ($${item.amount.toFixed(2)})?`);
}
window.confirmDeleteBilling = confirmDeleteBilling;

function setupBillingSearch() {
    const searchInput = document.getElementById('billingSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (!query) {
                renderBillingsTable();
                return;
            }
            const filtered = billings.filter(b => 
                b.patientName.toLowerCase().includes(query) ||
                b.receiptNumber.toLowerCase().includes(query) ||
                b.service.toLowerCase().includes(query)
            );
            renderBillingsTable(filtered);
        });
    }
}

function setupBillingFilter() {
    const select = document.getElementById('filterBillingStatus');
    if (select) {
        select.addEventListener('change', (e) => {
            const val = e.target.value;
            if (val === 'all') {
                renderBillingsTable();
            } else {
                const filtered = billings.filter(b => b.status === val);
                renderBillingsTable(filtered);
            }
        });
    }
}

/* ==========================================================================
   10. MUSHAHARKA DHAKHAATIIRTA (DOCTOR PAYROLL)
   ========================================================================== */

function populateSalaryDoctorDropdown() {
    const select = document.getElementById('salaryDoctorSelect');
    if (!select) return;

    select.innerHTML = '<option value="">-- Dooro Dhakhtarka --</option>';
    doctors.forEach(doc => {
        const opt = document.createElement('option');
        opt.value = doc.name;
        opt.textContent = `${doc.name} — ${doc.specialty}`;
        select.appendChild(opt);
    });
}

function setupSalaryForm() {
    const toggleBtn = document.getElementById('btnToggleSalaryForm');
    const closeBtn = document.getElementById('btnCloseSalaryForm');
    const cancelBtn = document.getElementById('btnCancelSalaryEdit');
    const form = document.getElementById('salaryForm');
    const baseInput = document.getElementById('salaryBaseAmount');
    const bonusInput = document.getElementById('salaryBonusAmount');
    const totalInput = document.getElementById('salaryTotalCalculated');
    const dateInput = document.getElementById('salaryDate');

    if (dateInput) {
        dateInput.value = new Date().toISOString().split('T')[0];
    }

    // Xisaabinta tooska ah ee Wadarta Guud = Base + Bonus
    function calculateTotal() {
        const base = parseFloat(baseInput.value) || 0;
        const bonus = parseFloat(bonusInput.value) || 0;
        const total = base + bonus;
        if (totalInput) {
            totalInput.value = `$${total.toFixed(2)}`;
        }
    }

    if (baseInput) baseInput.addEventListener('input', calculateTotal);
    if (bonusInput) bonusInput.addEventListener('input', calculateTotal);

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const container = document.getElementById('salaryFormContainer');
            if (container.classList.contains('open')) {
                closeSalaryForm();
            } else {
                openSalaryForm();
            }
        });
    }

    if (closeBtn) closeBtn.addEventListener('click', closeSalaryForm);
    if (cancelBtn) cancelBtn.addEventListener('click', resetSalaryForm);
    if (form) form.addEventListener('submit', handleSalarySubmit);
}

function openSalaryForm() {
    const container = document.getElementById('salaryFormContainer');
    if (container) {
        container.classList.add('open');
        const docSelect = document.getElementById('salaryDoctorSelect');
        if (docSelect) docSelect.focus();
    }
}
window.openSalaryForm = openSalaryForm;

function closeSalaryForm() {
    const container = document.getElementById('salaryFormContainer');
    if (container) {
        container.classList.remove('open');
        resetSalaryForm();
    }
}

function resetSalaryForm() {
    const form = document.getElementById('salaryForm');
    if (form) {
        form.reset();
        document.getElementById('salaryEditId').value = '';
        document.getElementById('salaryFormTitle').textContent = 'Foomka Bixinta Mushaharka Dhakhtarka';

        const submitBtn = document.getElementById('btnSubmitSalary');
        submitBtn.innerHTML = '<i class="fa-solid fa-money-bill-transfer"></i> Xaqiiji Bixinta Mushaharka';

        const cancelBtn = document.getElementById('btnCancelSalaryEdit');
        if (cancelBtn) cancelBtn.style.display = 'none';

        const totalInput = document.getElementById('salaryTotalCalculated');
        if (totalInput) totalInput.value = '$0.00';

        const dateInput = document.getElementById('salaryDate');
        if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];

        clearFormErrors('salaryForm');
    }
}

function handleSalarySubmit(e) {
    e.preventDefault();
    clearFormErrors('salaryForm');

    const editId = document.getElementById('salaryEditId').value.trim();
    const docSelect = document.getElementById('salaryDoctorSelect');
    const monthSelect = document.getElementById('salaryMonth');
    const baseInput = document.getElementById('salaryBaseAmount');
    const bonusInput = document.getElementById('salaryBonusAmount');
    const methodSelect = document.getElementById('salaryPaymentMethod');
    const dateInput = document.getElementById('salaryDate');
    const statusSelect = document.getElementById('salaryStatus');

    const doctorName = docSelect.value.trim();
    const month = monthSelect.value.trim();
    const baseAmount = parseFloat(baseInput.value);
    const bonusAmount = parseFloat(bonusInput.value) || 0;
    const paymentMethod = methodSelect.value.trim();
    const date = dateInput.value.trim();
    const status = statusSelect.value.trim();

    let isValid = true;

    if (!doctorName) {
        showFieldError('salaryDoctorError', 'Fadlan dooro dhakhtarka la siinayo mushaharka.');
        docSelect.classList.add('is-invalid');
        isValid = false;
    }

    if (!month) {
        showFieldError('salaryMonthError', 'Fadlan dooro bisha mushaharka.');
        monthSelect.classList.add('is-invalid');
        isValid = false;
    }

    if (isNaN(baseAmount) || baseAmount <= 0) {
        showFieldError('salaryBaseAmountError', 'Fadlan geli mushahar sax ah (ugu yaraan $100).');
        baseInput.classList.add('is-invalid');
        isValid = false;
    }

    if (!date) {
        showFieldError('salaryDateError', 'Fadlan geli taariikhda bixinta.');
        dateInput.classList.add('is-invalid');
        isValid = false;
    }

    if (!isValid) {
        showToast('Fadlan si sax ah u buuxi xogta mushaharka!', 'error');
        return;
    }

    const totalAmount = baseAmount + bonusAmount;
    const matchedDoc = doctors.find(d => d.name === doctorName);
    const specialty = matchedDoc ? matchedDoc.specialty : 'Dhakhtar';

    if (editId) {
        const index = salaries.findIndex(s => s.id === editId);
        if (index !== -1) {
            salaries[index] = {
                ...salaries[index],
                doctorName,
                specialty,
                month,
                baseAmount,
                bonusAmount,
                totalAmount,
                paymentMethod,
                date,
                status,
                updatedAt: new Date().toISOString()
            };
            saveSalariesToStorage();
            renderAll();
            closeSalaryForm();
            showToast(`Mushaharka "${doctorName}" si guul leh ayaa loo cusboonaysiiyey!`, 'success');
        }
    } else {
        const slipId = 'SAL-' + Math.floor(2000 + Math.random() * 8000);
        const newSalary = {
            id: 'sal-' + Date.now(),
            slipId,
            doctorName,
            specialty,
            month,
            baseAmount,
            bonusAmount,
            totalAmount,
            paymentMethod,
            date,
            status,
            createdAt: new Date().toISOString()
        };

        salaries.unshift(newSalary);
        saveSalariesToStorage();
        renderAll();
        closeSalaryForm();
        showToast(`Mushaharka "${doctorName}" ($${totalAmount.toFixed(2)}) si guul leh ayaa loo diiwaangeliyey!`, 'success');
    }
}

function renderSalariesTable(filterStatus = 'all') {
    const tbody = document.getElementById('salariesTableBody');
    const emptyState = document.getElementById('noSalariesMessage');
    const table = document.getElementById('salariesTable');
    const badge = document.getElementById('salariesCountBadge');

    if (!tbody) return;

    const list = filterStatus === 'all'
        ? salaries
        : salaries.filter(s => s.status === filterStatus);

    if (badge) badge.textContent = salaries.length;

    tbody.innerHTML = '';

    if (list.length === 0) {
        if (emptyState) emptyState.style.display = 'block';
        if (table) table.style.display = 'none';
        return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (table) table.style.display = 'table';

    list.forEach(sal => {
        const tr = document.createElement('tr');

        let statusBadge = sal.status === 'La Bixiyay'
            ? `<span class="badge badge-status-xaqiijiyey"><i class="fa-solid fa-circle-check"></i> La Bixiyay</span>`
            : `<span class="badge badge-status-sugaya"><i class="fa-solid fa-clock"></i> Sugaya</span>`;

        tr.innerHTML = `
            <td><strong style="color: var(--primary); font-family: monospace;">${escapeHtml(sal.slipId)}</strong></td>
            <td>
                <strong>${escapeHtml(sal.doctorName)}</strong>
                <br><small class="text-muted">${escapeHtml(sal.specialty)}</small>
            </td>
            <td><strong>${escapeHtml(sal.month)}</strong></td>
            <td>
                <strong style="color: var(--primary-dark); font-size: 1rem;">$${sal.totalAmount.toFixed(2)}</strong>
                <br><small class="text-muted">Aasaasi: $${sal.baseAmount} | Gunno: $${sal.bonusAmount}</small>
            </td>
            <td><small>${escapeHtml(sal.paymentMethod)}</small></td>
            <td><small>${escapeHtml(sal.date)}</small></td>
            <td>${statusBadge}</td>
            <td class="text-center">
                <div class="cell-actions">
                    <button class="btn-action" style="background-color: #dbeafe; color: #1e40af;" title="Arag & Daabac Slip-ka" onclick="openSalarySlipModal('${sal.id}')">
                        <i class="fa-solid fa-print"></i>
                    </button>
                    ${sal.status === 'Sugaya' ? `
                        <button class="btn-action btn-action-status" title="Ka dhig mid La Bixiyay" onclick="updateSalaryStatus('${sal.id}', 'La Bixiyay')">
                            <i class="fa-solid fa-check"></i>
                        </button>
                    ` : ''}
                    <button class="btn-action btn-action-delete" title="Tirtir" onclick="confirmDeleteSalary('${sal.id}')">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

function updateSalaryStatus(id, newStatus) {
    const sal = salaries.find(s => s.id === id);
    if (!sal) return;

    sal.status = newStatus;
    saveSalariesToStorage();
    renderAll();
    showToast(`Mushaharka "${sal.doctorName}" waxaa laga dhigay: "${newStatus}"!`, 'info');
}
window.updateSalaryStatus = updateSalaryStatus;

function confirmDeleteSalary(id) {
    const sal = salaries.find(s => s.id === id);
    if (!sal) return;

    openDeleteModal('salary', sal.id, `Ma hubtaa inaad tirtirto mushaharka #${sal.slipId} ee "${sal.doctorName}" ($${sal.totalAmount.toFixed(2)})?`);
}
window.confirmDeleteSalary = confirmDeleteSalary;

function setupSalaryFilter() {
    const select = document.getElementById('filterSalaryStatus');
    if (select) {
        select.addEventListener('change', (e) => {
            renderSalariesTable(e.target.value);
        });
    }
}

/* ==========================================================================
   11. XISAABAADKA & DAKHLIGA ISBITAALKA (FINANCIAL ANALYTICS & REVENUE)
   ========================================================================== */

/**
 * Xisaabinta guud ee dakhliga, kharashaadka, iyo faa'iidada saafiga ah
 * Tani waxay si buuxda uga jawaabaysaa: "sidee ku ogaan karaa in isbital ka lacagta kasoo xaroto"
 */
function updateFinancialStats() {
    // 1. Dakhliga Guud ee Soo Xarooday (Total Revenue from paid patient bills)
    const totalRevenue = billings
        .filter(b => b.status === 'La Bixiyey')
        .reduce((sum, b) => sum + (parseFloat(b.amount) || 0), 0);

    // 2. Kharashka Guud ee Baxay (Total Expenses from paid doctor salaries)
    const totalExpenses = salaries
        .filter(s => s.status === 'La Bixiyay')
        .reduce((sum, s) => sum + (parseFloat(s.totalAmount) || 0), 0);

    // 3. Faa'iidada Saafiga ah ee Isbitaalka (Net Profit = Dakhli - Kharash)
    const netProfit = totalRevenue - totalExpenses;

    // 4. Lacagaha Bukaannada ee Qabyada ah (Pending Receivables)
    const pendingReceivables = billings
        .filter(b => b.status === 'Sugaya')
        .reduce((sum, b) => sum + (parseFloat(b.amount) || 0), 0);

    // Cusboonaysii Dashboard Banner
    const dashRev = document.getElementById('dashTotalRevenue');
    const dashExp = document.getElementById('dashTotalExpenses');
    const dashProf = document.getElementById('dashNetProfit');
    const dashBadge = document.getElementById('dashProfitStatusBadge');
    const dashPend = document.getElementById('dashPendingReceivables');

    if (dashRev) dashRev.textContent = `$${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (dashExp) dashExp.textContent = `$${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (dashPend) dashPend.textContent = `$${pendingReceivables.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    if (dashProf) {
        if (netProfit >= 0) {
            dashProf.textContent = `+$${netProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            dashProf.style.color = '#34d399';
            if (dashBadge) dashBadge.textContent = "Faa'iido Saafi ah (Dakhligu wuu sarreeyaa)";
        } else {
            dashProf.textContent = `-$${Math.abs(netProfit).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            dashProf.style.color = '#f87171';
            if (dashBadge) dashBadge.textContent = "Khasaare (Kharashka ayaa badan)";
        }
    }

    // Cusboonaysii Qaybta Xisaabaadka (Finance Section)
    const finRev = document.getElementById('financeTotalRevenue');
    const finExp = document.getElementById('financeTotalExpenses');
    const finProf = document.getElementById('financeNetProfit');
    const finPend = document.getElementById('financePendingReceivables');
    const profitCard = document.getElementById('financeProfitCard');
    const profitIcon = document.getElementById('financeProfitIcon');
    const profitDesc = document.getElementById('financeProfitDescription');

    if (finRev) finRev.textContent = `$${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (finExp) finExp.textContent = `$${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (finPend) finPend.textContent = `$${pendingReceivables.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    if (finProf && profitCard && profitDesc) {
        if (netProfit >= 0) {
            finProf.textContent = `+$${netProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            profitCard.className = 'finance-card card-profit profit-positive';
            if (profitIcon) profitIcon.className = 'fa-solid fa-arrow-trend-up text-success';
            profitDesc.innerHTML = `<i class="fa-solid fa-circle-check text-success"></i> Isbitaalku wuxuu ku jiraa faa'iido wanaagsan.`;
        } else {
            finProf.textContent = `-$${Math.abs(netProfit).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            profitCard.className = 'finance-card card-profit profit-negative';
            if (profitIcon) profitIcon.className = 'fa-solid fa-triangle-exclamation text-danger';
            profitDesc.innerHTML = `<i class="fa-solid fa-circle-xmark text-danger"></i> Kharashka ayaa ka badan dakhliga soo xarooday.`;
        }
    }
}

/**
 * Soo saaridda shaashadaha falanqaynta dakhliga (Revenue Breakdown by Service & Method)
 */
function renderRevenueBreakdown() {
    const serviceContainer = document.getElementById('serviceBreakdownContainer');
    const methodContainer = document.getElementById('methodBreakdownContainer');

    const paidBillings = billings.filter(b => b.status === 'La Bixiyey');
    const totalPaid = paidBillings.reduce((sum, b) => sum + (parseFloat(b.amount) || 0), 0) || 1;

    // 1. Dakhliga ku saleysan Adeegyada Caafimaadka
    if (serviceContainer) {
        serviceContainer.innerHTML = '';
        const serviceTotals = {};

        paidBillings.forEach(b => {
            const sName = b.service || 'Adeeg Kale';
            serviceTotals[sName] = (serviceTotals[sName] || 0) + (parseFloat(b.amount) || 0);
        });

        const sortedServices = Object.entries(serviceTotals).sort((a, b) => b[1] - a[1]);

        if (sortedServices.length === 0) {
            serviceContainer.innerHTML = `<p class="text-muted">Wali ma jiro dakhli soo xarooday.</p>`;
        } else {
            sortedServices.forEach(([serviceName, amount]) => {
                const percentage = Math.round((amount / totalPaid) * 100);
                const item = document.createElement('div');
                item.className = 'service-progress-item';
                item.innerHTML = `
                    <div class="sp-header">
                        <span><i class="fa-solid fa-stethoscope" style="color: var(--primary); margin-right: 6px;"></i>${escapeHtml(serviceName)}</span>
                        <span class="sp-amount">$${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })} (${percentage}%)</span>
                    </div>
                    <div class="progress-bar-wrap">
                        <div class="progress-bar-fill" style="width: ${percentage}%;"></div>
                    </div>
                `;
                serviceContainer.appendChild(item);
            });
        }
    }

    // 2. Dakhliga ku saleysan Hababka Lacag-bixinta
    if (methodContainer) {
        methodContainer.innerHTML = '';
        const methodTotals = {};

        paidBillings.forEach(b => {
            const mName = b.paymentMethod || 'Kaash';
            methodTotals[mName] = (methodTotals[mName] || 0) + (parseFloat(b.amount) || 0);
        });

        const sortedMethods = Object.entries(methodTotals).sort((a, b) => b[1] - a[1]);

        if (sortedMethods.length === 0) {
            methodContainer.innerHTML = `<p class="text-muted">Wali ma jiraan lacago la bixiyey.</p>`;
        } else {
            sortedMethods.forEach(([methodName, amount]) => {
                const percentage = Math.round((amount / totalPaid) * 100);
                const item = document.createElement('div');
                item.className = 'service-progress-item';
                item.innerHTML = `
                    <div class="sp-header">
                        <span><i class="fa-solid fa-wallet" style="color: var(--success); margin-right: 6px;"></i>${escapeHtml(methodName)}</span>
                        <span class="sp-amount" style="color: var(--success-dark);">$${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })} (${percentage}%)</span>
                    </div>
                    <div class="progress-bar-wrap">
                        <div class="progress-bar-fill" style="width: ${percentage}%; background: linear-gradient(90deg, #10b981, #059669);"></div>
                    </div>
                `;
                methodContainer.appendChild(item);
            });
        }
    }
}

/* ==========================================================================
   12. MODAL-KA RASIIDKA & SLIPS-KA (PRINTABLE INVOICE & PAY SLIP)
   ========================================================================== */

function openReceiptModal(billingId) {
    const item = billings.find(b => b.id === billingId);
    if (!item) return;

    const modal = document.getElementById('receiptModal');
    if (!modal) return;

    document.getElementById('receiptNumber').textContent = '#' + item.receiptNumber;
    document.getElementById('receiptPatientName').textContent = item.patientName;
    document.getElementById('receiptDate').textContent = item.date;
    document.getElementById('receiptMethod').textContent = item.paymentMethod;

    const statusBadge = document.getElementById('receiptStatusBadge');
    if (statusBadge) {
        if (item.status === 'La Bixiyey') {
            statusBadge.className = 'badge badge-status-xaqiijiyey';
            statusBadge.innerHTML = '<i class="fa-solid fa-circle-check"></i> La Bixiyey';
        } else {
            statusBadge.className = 'badge badge-status-sugaya';
            statusBadge.innerHTML = '<i class="fa-solid fa-clock"></i> Sugaya (Qabyo)';
        }
    }

    document.getElementById('receiptService').textContent = item.service + (item.notes ? ` (${item.notes})` : '');
    document.getElementById('receiptSubtotal').textContent = `$${item.amount.toFixed(2)}`;
    document.getElementById('receiptTotal').textContent = `$${item.amount.toFixed(2)}`;

    modal.classList.add('open');
}
window.openReceiptModal = openReceiptModal;

function closeReceiptModal() {
    const modal = document.getElementById('receiptModal');
    if (modal) modal.classList.remove('open');
}
window.closeReceiptModal = closeReceiptModal;

function openSalarySlipModal(salaryId) {
    const item = salaries.find(s => s.id === salaryId);
    if (!item) return;

    const modal = document.getElementById('salarySlipModal');
    if (!modal) return;

    document.getElementById('slipId').textContent = '#' + item.slipId;
    document.getElementById('slipDoctorName').textContent = item.doctorName + ` (${item.specialty})`;
    document.getElementById('slipMonth').textContent = item.month;
    document.getElementById('slipMethod').textContent = item.paymentMethod;
    document.getElementById('slipDate').textContent = item.date;
    document.getElementById('slipBaseAmount').textContent = `$${item.baseAmount.toFixed(2)}`;
    document.getElementById('slipBonusAmount').textContent = `$${item.bonusAmount.toFixed(2)}`;
    document.getElementById('slipTotalAmount').textContent = `$${item.totalAmount.toFixed(2)}`;

    modal.classList.add('open');
}
window.openSalarySlipModal = openSalarySlipModal;

function closeSalarySlipModal() {
    const modal = document.getElementById('salarySlipModal');
    if (modal) modal.classList.remove('open');
}
window.closeSalarySlipModal = closeSalarySlipModal;

function setupDoctorsFilter() {
    const pills = document.querySelectorAll('#doctorsFilterPills .filter-pill');
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            const filter = pill.getAttribute('data-filter');
            renderDoctorsGrid(filter);
        });
    });
}

/**
 * Ballan toos ah oo lala qabsado dhakhtarka
 */
function quickBookDoctor(doctorFullName) {
    navigateTo('appointmentsSection', true);
    
    // Dooro dhakhtarkan foomka
    setTimeout(() => {
        const docSelect = document.getElementById('appointmentDoctorSelect');
        if (docSelect) {
            docSelect.value = doctorFullName;
        }
        document.getElementById('appointmentPatientName').focus();
    }, 150);
}
window.quickBookDoctor = quickBookDoctor;

/* ==========================================================================
   7. BALLAMAHA (APPOINTMENTS MANAGEMENT)
   ========================================================================== */

function setupAppointmentForm() {
    const toggleBtn = document.getElementById('btnToggleAppointmentForm');
    const closeBtn = document.getElementById('btnCloseAppointmentForm');
    const form = document.getElementById('appointmentForm');

    // Default appointment date: Berri (Tomorrow)
    const dateInput = document.getElementById('appointmentDate');
    if (dateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const yyyy = tomorrow.getFullYear();
        const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const dd = String(tomorrow.getDate()).padStart(2, '0');
        dateInput.min = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`;
        dateInput.value = `${yyyy}-${mm}-${dd}`;
    }

    // Default time: 09:00
    const timeInput = document.getElementById('appointmentTime');
    if (timeInput) {
        timeInput.value = '09:00';
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const container = document.getElementById('appointmentFormContainer');
            if (container.classList.contains('open')) {
                closeAppointmentForm();
            } else {
                openAppointmentForm();
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeAppointmentForm);
    }

    if (form) {
        form.addEventListener('submit', handleAppointmentSubmit);
    }
}

function openAppointmentForm() {
    const container = document.getElementById('appointmentFormContainer');
    if (container) {
        container.classList.add('open');
        document.getElementById('appointmentPatientName').focus();
    }
}

function closeAppointmentForm() {
    const container = document.getElementById('appointmentFormContainer');
    if (container) {
        container.classList.remove('open');
        const form = document.getElementById('appointmentForm');
        if (form) form.reset();
        clearFormErrors('appointmentForm');
    }
}

function handleAppointmentSubmit(e) {
    e.preventDefault();
    clearFormErrors('appointmentForm');

    const patientNameInput = document.getElementById('appointmentPatientName');
    const doctorSelect = document.getElementById('appointmentDoctorSelect');
    const dateInput = document.getElementById('appointmentDate');
    const timeInput = document.getElementById('appointmentTime');
    const reasonInput = document.getElementById('appointmentReason');

    const patientName = patientNameInput.value.trim();
    const doctorName = doctorSelect.value.trim();
    const date = dateInput.value.trim();
    const time = timeInput.value.trim();
    const reason = reasonInput.value.trim();

    let isValid = true;

    // 1. Hubinta Magaca Bukaanka
    if (!patientName) {
        showFieldError('appointmentPatientNameError', 'Fadlan geli magaca bukaanka ballanta loo qabanayo.');
        patientNameInput.classList.add('is-invalid');
        isValid = false;
    }

    // 2. Hubinta Dhakhtarka
    if (!doctorName) {
        showFieldError('appointmentDoctorError', 'Fadlan dooro dhakhtarka bukaanku u tagayo.');
        doctorSelect.classList.add('is-invalid');
        isValid = false;
    }

    // 3. Hubinta Taariikhda
    if (!date) {
        showFieldError('appointmentDateError', 'Fadlan dooro taariikhda ballanta.');
        dateInput.classList.add('is-invalid');
        isValid = false;
    }

    // 4. Hubinta Saacadda
    if (!time) {
        showFieldError('appointmentTimeError', 'Fadlan dooro saacadda ballanta.');
        timeInput.classList.add('is-invalid');
        isValid = false;
    }

    // 5. Hubinta Sababta
    if (!reason) {
        showFieldError('appointmentReasonError', 'Fadlan qor sababta ballanta (Tusaale: Baaris caafimaad).');
        reasonInput.classList.add('is-invalid');
        isValid = false;
    }

    if (!isValid) {
        showToast('Fadlan si sax ah u buuxi xogta ballanta!', 'error');
        return;
    }

    const newAppointment = {
        id: 'apt-' + Date.now(),
        patientName,
        doctorName,
        date,
        time,
        reason,
        status: 'Sugaya',
        createdAt: new Date().toISOString()
    };

    appointments.unshift(newAppointment);
    saveAppointmentsToStorage();
    renderAll();
    closeAppointmentForm();
    showToast(`Ballanta bukaanka "${patientName}" si guul leh ayaa loo qabtay!`, 'success');
}

/**
 * Soo saaridda shaxda ballamaha
 */
function renderAppointmentsTable(filterStatus = 'all') {
    const tbody = document.getElementById('appointmentsTableBody');
    const emptyState = document.getElementById('noAppointmentsMessage');
    const table = document.getElementById('appointmentsTable');

    if (!tbody) return;

    tbody.innerHTML = '';

    const list = filterStatus === 'all'
        ? appointments
        : appointments.filter(a => a.status === filterStatus);

    if (list.length === 0) {
        if (emptyState) emptyState.style.display = 'block';
        if (table) table.style.display = 'none';
        return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (table) table.style.display = 'table';

    list.forEach((apt, index) => {
        const tr = document.createElement('tr');

        let statusBadge = `<span class="badge badge-status-sugaya">${escapeHtml(apt.status)}</span>`;
        if (apt.status === 'La Xaqiijiyey') {
            statusBadge = `<span class="badge badge-status-xaqiijiyey"><i class="fa-solid fa-circle-check"></i> ${escapeHtml(apt.status)}</span>`;
        } else if (apt.status === 'Dhameystiran') {
            statusBadge = `<span class="badge badge-status-dhameystiran"><i class="fa-solid fa-check-double"></i> ${escapeHtml(apt.status)}</span>`;
        }

        tr.innerHTML = `
            <td><strong>#${index + 1}</strong></td>
            <td><strong>${escapeHtml(apt.patientName)}</strong></td>
            <td>${escapeHtml(apt.doctorName)}</td>
            <td><i class="fa-regular fa-calendar" style="color: var(--primary);"></i> ${escapeHtml(apt.date)}</td>
            <td><i class="fa-regular fa-clock" style="color: var(--success);"></i> ${escapeHtml(apt.time)}</td>
            <td>${escapeHtml(apt.reason)}</td>
            <td>${statusBadge}</td>
            <td class="text-center">
                <div class="cell-actions">
                    ${apt.status === 'Sugaya' ? `
                        <button class="btn-action btn-action-status" title="Xaqiiji Ballanta" onclick="updateAppointmentStatus('${apt.id}', 'La Xaqiijiyey')">
                            <i class="fa-solid fa-check"></i>
                        </button>
                    ` : ''}
                    ${apt.status === 'La Xaqiijiyey' ? `
                        <button class="btn-action btn-action-status" title="Ka dhig mid dhameystiran" onclick="updateAppointmentStatus('${apt.id}', 'Dhameystiran')">
                            <i class="fa-solid fa-check-double"></i>
                        </button>
                    ` : ''}
                    <button class="btn-action btn-action-delete" title="Tirtir ballanta" onclick="confirmDeleteAppointment('${apt.id}')">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

function updateAppointmentStatus(aptId, newStatus) {
    const apt = appointments.find(a => a.id === aptId);
    if (!apt) return;

    apt.status = newStatus;
    saveAppointmentsToStorage();
    renderAll();
    showToast(`Xaaladda ballanta waxaa laga dhigay: "${newStatus}"`, 'info');
}
window.updateAppointmentStatus = updateAppointmentStatus;

window.confirmDeleteAppointment = function(aptId) {
    const apt = appointments.find(a => a.id === aptId);
    if (!apt) return;

    openDeleteModal('appointment', apt.id, `Ma hubtaa inaad tirtirto ballanta bukaanka "${apt.patientName}"?`);
};

function setupAppointmentFilter() {
    const select = document.getElementById('filterAppointmentStatus');
    if (select) {
        select.addEventListener('change', (e) => {
            renderAppointmentsTable(e.target.value);
        });
    }
}

/* ==========================================================================
   8. QAYBAHA ISBITAALKA (DEPARTMENTS SECTION)
   ========================================================================== */

function renderDepartmentsGrid() {
    const container = document.getElementById('departmentsGridContainer');
    if (!container) return;

    container.innerHTML = '';
    HOSPITAL_DEPARTMENTS.forEach(dept => {
        const card = document.createElement('div');
        card.className = 'department-card';

        card.innerHTML = `
            <div class="department-header">
                <div class="dept-icon">
                    <i class="fa-solid ${dept.icon}"></i>
                </div>
                <div class="dept-title">
                    <h3>${escapeHtml(dept.name)}</h3>
                    <span>${escapeHtml(dept.room)}</span>
                </div>
            </div>
            
            <p class="dept-description">${escapeHtml(dept.description)}</p>

            <div class="dept-meta-grid">
                <div class="dept-meta-item">
                    <small>Madaxa Qaybta</small>
                    <strong>${escapeHtml(dept.head)}</strong>
                </div>
                <div class="dept-meta-item">
                    <small>Sariiraha</small>
                    <strong>${escapeHtml(dept.beds)}</strong>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

/* ==========================================================================
   9. LACAG-BIXINTA BUKAANKA (PATIENT BILLING & INVOICING)
   ========================================================================== */

function setupBillingForm() {
    const toggleBtn = document.getElementById('btnToggleBillingForm');
    const closeBtn = document.getElementById('btnCloseBillingForm');
    const cancelBtn = document.getElementById('btnCancelBillingEdit');
    const form = document.getElementById('billingForm');
    const serviceSelect = document.getElementById('billingServiceSelect');
    const amountInput = document.getElementById('billingAmount');
    const dateInput = document.getElementById('billingDate');

    // Taariikhda maanta geli sida default
    if (dateInput) {
        dateInput.value = new Date().toISOString().split('T')[0];
    }

    // Marka adeegga la doorto, si toos ah u soo saar qiimaha caadiga ah
    if (serviceSelect && amountInput) {
        serviceSelect.addEventListener('change', () => {
            const selectedOpt = serviceSelect.options[serviceSelect.selectedIndex];
            const price = selectedOpt ? selectedOpt.getAttribute('data-price') : null;
            if (price && Number(price) > 0) {
                amountInput.value = price;
            } else if (selectedOpt && selectedOpt.value === 'Adeeg Kale') {
                amountInput.value = '';
                amountInput.placeholder = 'Geli qadarka lacagta...';
                amountInput.focus();
            }
        });
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const container = document.getElementById('billingFormContainer');
            if (container.classList.contains('open')) {
                closeBillingForm();
            } else {
                openBillingForm();
            }
        });
    }

    if (closeBtn) closeBtn.addEventListener('click', closeBillingForm);
    if (cancelBtn) cancelBtn.addEventListener('click', resetBillingForm);
    if (form) form.addEventListener('submit', handleBillingSubmit);
}

function openBillingForm() {
    const container = document.getElementById('billingFormContainer');
    if (container) {
        container.classList.add('open');
        const patientInput = document.getElementById('billingPatientName');
        if (patientInput) patientInput.focus();
    }
}
window.openBillingForm = openBillingForm;

function closeBillingForm() {
    const container = document.getElementById('billingFormContainer');
    if (container) {
        container.classList.remove('open');
        resetBillingForm();
    }
}

function resetBillingForm() {
    const form = document.getElementById('billingForm');
    if (form) {
        form.reset();
        document.getElementById('billingEditId').value = '';
        document.getElementById('billingFormTitle').textContent = 'Foomka Diiwaangelinta Lacag-bixinta';
        
        const submitBtn = document.getElementById('btnSubmitBilling');
        submitBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Diiwaangeli Lacag-bixinta';

        const cancelBtn = document.getElementById('btnCancelBillingEdit');
        if (cancelBtn) cancelBtn.style.display = 'none';

        const dateInput = document.getElementById('billingDate');
        if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];

        clearFormErrors('billingForm');
    }
}

function handleBillingSubmit(e) {
    e.preventDefault();
    clearFormErrors('billingForm');

    const editId = document.getElementById('billingEditId').value.trim();
    const patientNameInput = document.getElementById('billingPatientName');
    const serviceSelect = document.getElementById('billingServiceSelect');
    const amountInput = document.getElementById('billingAmount');
    const methodSelect = document.getElementById('billingMethod');
    const dateInput = document.getElementById('billingDate');
    const statusSelect = document.getElementById('billingStatus');
    const notesInput = document.getElementById('billingNotes');

    const patientName = patientNameInput.value.trim();
    const service = serviceSelect.value.trim();
    const amount = parseFloat(amountInput.value);
    const paymentMethod = methodSelect.value.trim();
    const date = dateInput.value.trim();
    const status = statusSelect.value.trim();
    const notes = notesInput ? notesInput.value.trim() : '';

    let isValid = true;

    if (!patientName) {
        showFieldError('billingPatientNameError', 'Fadlan geli magaca bukaanka lacagta laga qabanayo.');
        patientNameInput.classList.add('is-invalid');
        isValid = false;
    }

    if (!service) {
        showFieldError('billingServiceError', 'Fadlan dooro nooca adeegga caafimaadka.');
        serviceSelect.classList.add('is-invalid');
        isValid = false;
    }

    if (isNaN(amount) || amount <= 0) {
        showFieldError('billingAmountError', 'Fadlan geli qadar lacag oo sax ah (ugu yaraan $1).');
        amountInput.classList.add('is-invalid');
        isValid = false;
    }

    if (!paymentMethod) {
        showFieldError('billingMethodError', 'Fadlan dooro habka lacag-bixinta.');
        methodSelect.classList.add('is-invalid');
        isValid = false;
    }

    if (!date) {
        showFieldError('billingDateError', 'Fadlan dooro taariikhda lacag-bixinta.');
        dateInput.classList.add('is-invalid');
        isValid = false;
    }

    if (!isValid) {
        showToast('Fadlan si sax ah u buuxi xogta lacag-bixinta!', 'error');
        return;
    }

    if (editId) {
        const index = billings.findIndex(b => b.id === editId);
        if (index !== -1) {
            billings[index] = {
                ...billings[index],
                patientName,
                service,
                amount,
                paymentMethod,
                date,
                status,
                notes,
                updatedAt: new Date().toISOString()
            };
            saveBillingsToStorage();
            renderAll();
            closeBillingForm();
            showToast(`Biilka #${billings[index].receiptNumber} si guul leh ayaa loo cusboonaysiiyey!`, 'success');
        }
    } else {
        const receiptNumber = 'INV-' + Math.floor(1000 + Math.random() * 9000);
        const newBilling = {
            id: 'bill-' + Date.now(),
            receiptNumber,
            patientName,
            service,
            amount,
            paymentMethod,
            date,
            status,
            notes,
            createdAt: new Date().toISOString()
        };

        billings.unshift(newBilling);
        saveBillingsToStorage();
        renderAll();
        closeBillingForm();
        showToast(`Lacag-bixinta bukaanka "${patientName}" ($${amount.toFixed(2)}) si guul leh ayaa loo diiwaangeliyey!`, 'success');
    }
}

function renderBillingsTable(filterList = null) {
    const tbody = document.getElementById('billingsTableBody');
    const emptyState = document.getElementById('noBillingsMessage');
    const table = document.getElementById('billingsTable');
    const badge = document.getElementById('billingCountBadge');

    if (!tbody) return;

    const list = filterList !== null ? filterList : billings;
    if (badge) badge.textContent = billings.length;

    tbody.innerHTML = '';

    if (list.length === 0) {
        if (emptyState) emptyState.style.display = 'block';
        if (table) table.style.display = 'none';
        return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (table) table.style.display = 'table';

    list.forEach(item => {
        const tr = document.createElement('tr');

        let statusBadge = item.status === 'La Bixiyey'
            ? `<span class="badge badge-status-xaqiijiyey"><i class="fa-solid fa-circle-check"></i> La Bixiyey</span>`
            : `<span class="badge badge-status-sugaya"><i class="fa-solid fa-clock"></i> Sugaya</span>`;

        tr.innerHTML = `
            <td><strong style="color: var(--primary); font-family: monospace;">${escapeHtml(item.receiptNumber)}</strong></td>
            <td><strong>${escapeHtml(item.patientName)}</strong></td>
            <td><span class="badge" style="background-color: var(--primary-subtle); color: var(--primary);">${escapeHtml(item.service)}</span></td>
            <td><strong style="color: #047857; font-size: 1rem;">$${item.amount.toFixed(2)}</strong></td>
            <td><small><i class="fa-solid fa-credit-card" style="color: var(--text-muted); margin-right: 4px;"></i>${escapeHtml(item.paymentMethod)}</small></td>
            <td><small>${escapeHtml(item.date)}</small></td>
            <td>${statusBadge}</td>
            <td class="text-center">
                <div class="cell-actions">
                    <button class="btn-action" style="background-color: #dbeafe; color: #1e40af;" title="Arag & Daabac Rasiidka" onclick="openReceiptModal('${item.id}')">
                        <i class="fa-solid fa-print"></i>
                    </button>
                    ${item.status === 'Sugaya' ? `
                        <button class="btn-action btn-action-status" title="Ka dhig mid La Bixiyey" onclick="updateBillingStatus('${item.id}', 'La Bixiyey')">
                            <i class="fa-solid fa-check"></i>
                        </button>
                    ` : ''}
                    <button class="btn-action btn-action-delete" title="Tirtir biilka" onclick="confirmDeleteBilling('${item.id}')">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

function updateBillingStatus(id, newStatus) {
    const item = billings.find(b => b.id === id);
    if (!item) return;

    item.status = newStatus;
    saveBillingsToStorage();
    renderAll();
    showToast(`Biilka #${item.receiptNumber} waxaa laga dhigay: "${newStatus}"!`, 'info');
}
window.updateBillingStatus = updateBillingStatus;

function confirmDeleteBilling(id) {
    const item = billings.find(b => b.id === id);
    if (!item) return;

    openDeleteModal('billing', item.id, `Ma hubtaa inaad tirtirto biilka #${item.receiptNumber} ee bukaanka "${item.patientName}" ($${item.amount.toFixed(2)})?`);
}
window.confirmDeleteBilling = confirmDeleteBilling;

function setupBillingSearch() {
    const searchInput = document.getElementById('billingSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (!query) {
                renderBillingsTable();
                return;
            }
            const filtered = billings.filter(b => 
                b.patientName.toLowerCase().includes(query) ||
                b.receiptNumber.toLowerCase().includes(query) ||
                b.service.toLowerCase().includes(query)
            );
            renderBillingsTable(filtered);
        });
    }
}

function setupBillingFilter() {
    const select = document.getElementById('filterBillingStatus');
    if (select) {
        select.addEventListener('change', (e) => {
            const val = e.target.value;
            if (val === 'all') {
                renderBillingsTable();
            } else {
                const filtered = billings.filter(b => b.status === val);
                renderBillingsTable(filtered);
            }
        });
    }
}

/* ==========================================================================
   10. MUSHAHARKA DHAKHAATIIRTA (DOCTOR PAYROLL)
   ========================================================================== */

function populateSalaryDoctorDropdown() {
    const select = document.getElementById('salaryDoctorSelect');
    if (!select) return;

    select.innerHTML = '<option value="">-- Dooro Dhakhtarka --</option>';
    doctors.forEach(doc => {
        const opt = document.createElement('option');
        opt.value = doc.name;
        opt.textContent = `${doc.name} — ${doc.specialty}`;
        select.appendChild(opt);
    });
}

function setupSalaryForm() {
    const toggleBtn = document.getElementById('btnToggleSalaryForm');
    const closeBtn = document.getElementById('btnCloseSalaryForm');
    const cancelBtn = document.getElementById('btnCancelSalaryEdit');
    const form = document.getElementById('salaryForm');
    const baseInput = document.getElementById('salaryBaseAmount');
    const bonusInput = document.getElementById('salaryBonusAmount');
    const totalInput = document.getElementById('salaryTotalCalculated');
    const dateInput = document.getElementById('salaryDate');

    if (dateInput) {
        dateInput.value = new Date().toISOString().split('T')[0];
    }

    // Xisaabinta tooska ah ee Wadarta Guud = Base + Bonus
    function calculateTotal() {
        const base = parseFloat(baseInput.value) || 0;
        const bonus = parseFloat(bonusInput.value) || 0;
        const total = base + bonus;
        if (totalInput) {
            totalInput.value = `$${total.toFixed(2)}`;
        }
    }

    if (baseInput) baseInput.addEventListener('input', calculateTotal);
    if (bonusInput) bonusInput.addEventListener('input', calculateTotal);

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const container = document.getElementById('salaryFormContainer');
            if (container.classList.contains('open')) {
                closeSalaryForm();
            } else {
                openSalaryForm();
            }
        });
    }

    if (closeBtn) closeBtn.addEventListener('click', closeSalaryForm);
    if (cancelBtn) cancelBtn.addEventListener('click', resetSalaryForm);
    if (form) form.addEventListener('submit', handleSalarySubmit);
}

function openSalaryForm() {
    const container = document.getElementById('salaryFormContainer');
    if (container) {
        container.classList.add('open');
        const docSelect = document.getElementById('salaryDoctorSelect');
        if (docSelect) docSelect.focus();
    }
}
window.openSalaryForm = openSalaryForm;

function closeSalaryForm() {
    const container = document.getElementById('salaryFormContainer');
    if (container) {
        container.classList.remove('open');
        resetSalaryForm();
    }
}

function resetSalaryForm() {
    const form = document.getElementById('salaryForm');
    if (form) {
        form.reset();
        document.getElementById('salaryEditId').value = '';
        document.getElementById('salaryFormTitle').textContent = 'Foomka Bixinta Mushaharka Dhakhtarka';

        const submitBtn = document.getElementById('btnSubmitSalary');
        submitBtn.innerHTML = '<i class="fa-solid fa-money-bill-transfer"></i> Xaqiiji Bixinta Mushaharka';

        const cancelBtn = document.getElementById('btnCancelSalaryEdit');
        if (cancelBtn) cancelBtn.style.display = 'none';

        const totalInput = document.getElementById('salaryTotalCalculated');
        if (totalInput) totalInput.value = '$0.00';

        const dateInput = document.getElementById('salaryDate');
        if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];

        clearFormErrors('salaryForm');
    }
}

function handleSalarySubmit(e) {
    e.preventDefault();
    clearFormErrors('salaryForm');

    const editId = document.getElementById('salaryEditId').value.trim();
    const docSelect = document.getElementById('salaryDoctorSelect');
    const monthSelect = document.getElementById('salaryMonth');
    const baseInput = document.getElementById('salaryBaseAmount');
    const bonusInput = document.getElementById('salaryBonusAmount');
    const methodSelect = document.getElementById('salaryPaymentMethod');
    const dateInput = document.getElementById('salaryDate');
    const statusSelect = document.getElementById('salaryStatus');

    const doctorName = docSelect.value.trim();
    const month = monthSelect.value.trim();
    const baseAmount = parseFloat(baseInput.value);
    const bonusAmount = parseFloat(bonusInput.value) || 0;
    const paymentMethod = methodSelect.value.trim();
    const date = dateInput.value.trim();
    const status = statusSelect.value.trim();

    let isValid = true;

    if (!doctorName) {
        showFieldError('salaryDoctorError', 'Fadlan dooro dhakhtarka la siinayo mushaharka.');
        docSelect.classList.add('is-invalid');
        isValid = false;
    }

    if (!month) {
        showFieldError('salaryMonthError', 'Fadlan dooro bisha mushaharka.');
        monthSelect.classList.add('is-invalid');
        isValid = false;
    }

    if (isNaN(baseAmount) || baseAmount <= 0) {
        showFieldError('salaryBaseAmountError', 'Fadlan geli mushahar sax ah (ugu yaraan $100).');
        baseInput.classList.add('is-invalid');
        isValid = false;
    }

    if (!date) {
        showFieldError('salaryDateError', 'Fadlan geli taariikhda bixinta.');
        dateInput.classList.add('is-invalid');
        isValid = false;
    }

    if (!isValid) {
        showToast('Fadlan si sax ah u buuxi xogta mushaharka!', 'error');
        return;
    }

    const totalAmount = baseAmount + bonusAmount;
    const matchedDoc = doctors.find(d => d.name === doctorName);
    const specialty = matchedDoc ? matchedDoc.specialty : 'Dhakhtar';

    if (editId) {
        const index = salaries.findIndex(s => s.id === editId);
        if (index !== -1) {
            salaries[index] = {
                ...salaries[index],
                doctorName,
                specialty,
                month,
                baseAmount,
                bonusAmount,
                totalAmount,
                paymentMethod,
                date,
                status,
                updatedAt: new Date().toISOString()
            };
            saveSalariesToStorage();
            renderAll();
            closeSalaryForm();
            showToast(`Mushaharka "${doctorName}" si guul leh ayaa loo cusboonaysiiyey!`, 'success');
        }
    } else {
        const slipId = 'SAL-' + Math.floor(2000 + Math.random() * 8000);
        const newSalary = {
            id: 'sal-' + Date.now(),
            slipId,
            doctorName,
            specialty,
            month,
            baseAmount,
            bonusAmount,
            totalAmount,
            paymentMethod,
            date,
            status,
            createdAt: new Date().toISOString()
        };

        salaries.unshift(newSalary);
        saveSalariesToStorage();
        renderAll();
        closeSalaryForm();
        showToast(`Mushaharka "${doctorName}" ($${totalAmount.toFixed(2)}) si guul leh ayaa loo diiwaangeliyey!`, 'success');
    }
}

function renderSalariesTable(filterStatus = 'all') {
    const tbody = document.getElementById('salariesTableBody');
    const emptyState = document.getElementById('noSalariesMessage');
    const table = document.getElementById('salariesTable');
    const badge = document.getElementById('salariesCountBadge');

    if (!tbody) return;

    const list = filterStatus === 'all'
        ? salaries
        : salaries.filter(s => s.status === filterStatus);

    if (badge) badge.textContent = salaries.length;

    tbody.innerHTML = '';

    if (list.length === 0) {
        if (emptyState) emptyState.style.display = 'block';
        if (table) table.style.display = 'none';
        return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (table) table.style.display = 'table';

    list.forEach(sal => {
        const tr = document.createElement('tr');

        let statusBadge = sal.status === 'La Bixiyay'
            ? `<span class="badge badge-status-xaqiijiyey"><i class="fa-solid fa-circle-check"></i> La Bixiyay</span>`
            : `<span class="badge badge-status-sugaya"><i class="fa-solid fa-clock"></i> Sugaya</span>`;

        tr.innerHTML = `
            <td><strong style="color: var(--primary); font-family: monospace;">${escapeHtml(sal.slipId)}</strong></td>
            <td>
                <strong>${escapeHtml(sal.doctorName)}</strong>
                <br><small class="text-muted">${escapeHtml(sal.specialty)}</small>
            </td>
            <td><strong>${escapeHtml(sal.month)}</strong></td>
            <td>
                <strong style="color: var(--primary-dark); font-size: 1rem;">$${sal.totalAmount.toFixed(2)}</strong>
                <br><small class="text-muted">Aasaasi: $${sal.baseAmount} | Gunno: $${sal.bonusAmount}</small>
            </td>
            <td><small>${escapeHtml(sal.paymentMethod)}</small></td>
            <td><small>${escapeHtml(sal.date)}</small></td>
            <td>${statusBadge}</td>
            <td class="text-center">
                <div class="cell-actions">
                    <button class="btn-action" style="background-color: #dbeafe; color: #1e40af;" title="Arag & Daabac Slip-ka" onclick="openSalarySlipModal('${sal.id}')">
                        <i class="fa-solid fa-print"></i>
                    </button>
                    ${sal.status === 'Sugaya' ? `
                        <button class="btn-action btn-action-status" title="Ka dhig mid La Bixiyay" onclick="updateSalaryStatus('${sal.id}', 'La Bixiyay')">
                            <i class="fa-solid fa-check"></i>
                        </button>
                    ` : ''}
                    <button class="btn-action btn-action-delete" title="Tirtir" onclick="confirmDeleteSalary('${sal.id}')">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

function updateSalaryStatus(id, newStatus) {
    const sal = salaries.find(s => s.id === id);
    if (!sal) return;

    sal.status = newStatus;
    saveSalariesToStorage();
    renderAll();
    showToast(`Mushaharka "${sal.doctorName}" waxaa laga dhigay: "${newStatus}"!`, 'info');
}
window.updateSalaryStatus = updateSalaryStatus;

function confirmDeleteSalary(id) {
    const sal = salaries.find(s => s.id === id);
    if (!sal) return;

    openDeleteModal('salary', sal.id, `Ma hubtaa inaad tirtirto mushaharka #${sal.slipId} ee "${sal.doctorName}" ($${sal.totalAmount.toFixed(2)})?`);
}
window.confirmDeleteSalary = confirmDeleteSalary;

function setupSalaryFilter() {
    const select = document.getElementById('filterSalaryStatus');
    if (select) {
        select.addEventListener('change', (e) => {
            renderSalariesTable(e.target.value);
        });
    }
}

/* ==========================================================================
   11. XISAABAADKA & DAKHLIGA ISBITAALKA (FINANCIAL ANALYTICS & REVENUE)
   ========================================================================== */

/**
 * Xisaabinta guud ee dakhliga, kharashaadka, iyo faa'iidada saafiga ah
 * Tani waxay si buuxda uga jawaabaysaa: "sidee ku ogaan karaa in isbital ka lacagta kasoo xaroto"
 */
function updateFinancialStats() {
    // 1. Dakhliga Guud ee Soo Xarooday (Total Revenue from paid patient bills)
    const totalRevenue = billings
        .filter(b => b.status === 'La Bixiyey')
        .reduce((sum, b) => sum + (parseFloat(b.amount) || 0), 0);

    // 2. Kharashka Guud ee Baxay (Total Expenses from paid doctor salaries)
    const totalExpenses = salaries
        .filter(s => s.status === 'La Bixiyay')
        .reduce((sum, s) => sum + (parseFloat(s.totalAmount) || 0), 0);

    // 3. Faa'iidada Saafiga ah ee Isbitaalka (Net Profit = Dakhli - Kharash)
    const netProfit = totalRevenue - totalExpenses;

    // 4. Lacagaha Bukaannada ee Qabyada ah (Pending Receivables)
    const pendingReceivables = billings
        .filter(b => b.status === 'Sugaya')
        .reduce((sum, b) => sum + (parseFloat(b.amount) || 0), 0);

    // Cusboonaysii Dashboard Banner
    const dashRev = document.getElementById('dashTotalRevenue');
    const dashExp = document.getElementById('dashTotalExpenses');
    const dashProf = document.getElementById('dashNetProfit');
    const dashBadge = document.getElementById('dashProfitStatusBadge');
    const dashPend = document.getElementById('dashPendingReceivables');

    if (dashRev) dashRev.textContent = `$${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (dashExp) dashExp.textContent = `$${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (dashPend) dashPend.textContent = `$${pendingReceivables.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    if (dashProf) {
        if (netProfit >= 0) {
            dashProf.textContent = `+$${netProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            dashProf.style.color = '#34d399';
            if (dashBadge) dashBadge.textContent = "Faa'iido Saafi ah (Dakhligu wuu sarreeyaa)";
        } else {
            dashProf.textContent = `-$${Math.abs(netProfit).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            dashProf.style.color = '#f87171';
            if (dashBadge) dashBadge.textContent = "Khasaare (Kharashka ayaa badan)";
        }
    }

    // Cusboonaysii Qaybta Xisaabaadka (Finance Section)
    const finRev = document.getElementById('financeTotalRevenue');
    const finExp = document.getElementById('financeTotalExpenses');
    const finProf = document.getElementById('financeNetProfit');
    const finPend = document.getElementById('financePendingReceivables');
    const profitCard = document.getElementById('financeProfitCard');
    const profitIcon = document.getElementById('financeProfitIcon');
    const profitDesc = document.getElementById('financeProfitDescription');

    if (finRev) finRev.textContent = `$${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (finExp) finExp.textContent = `$${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (finPend) finPend.textContent = `$${pendingReceivables.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    if (finProf && profitCard && profitDesc) {
        if (netProfit >= 0) {
            finProf.textContent = `+$${netProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            profitCard.className = 'finance-card card-profit profit-positive';
            if (profitIcon) profitIcon.className = 'fa-solid fa-arrow-trend-up text-success';
            profitDesc.innerHTML = `<i class="fa-solid fa-circle-check text-success"></i> Isbitaalku wuxuu ku jiraa faa'iido wanaagsan.`;
        } else {
            finProf.textContent = `-$${Math.abs(netProfit).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            profitCard.className = 'finance-card card-profit profit-negative';
            if (profitIcon) profitIcon.className = 'fa-solid fa-triangle-exclamation text-danger';
            profitDesc.innerHTML = `<i class="fa-solid fa-circle-xmark text-danger"></i> Kharashka ayaa ka badan dakhliga soo xarooday.`;
        }
    }
}

/**
 * Soo saaridda shaashadaha falanqaynta dakhliga (Revenue Breakdown by Service & Method)
 */
function renderRevenueBreakdown() {
    const serviceContainer = document.getElementById('serviceBreakdownContainer');
    const methodContainer = document.getElementById('methodBreakdownContainer');

    const paidBillings = billings.filter(b => b.status === 'La Bixiyey');
    const totalPaid = paidBillings.reduce((sum, b) => sum + (parseFloat(b.amount) || 0), 0) || 1;

    // 1. Dakhliga ku saleysan Adeegyada Caafimaadka
    if (serviceContainer) {
        serviceContainer.innerHTML = '';
        const serviceTotals = {};

        paidBillings.forEach(b => {
            const sName = b.service || 'Adeeg Kale';
            serviceTotals[sName] = (serviceTotals[sName] || 0) + (parseFloat(b.amount) || 0);
        });

        const sortedServices = Object.entries(serviceTotals).sort((a, b) => b[1] - a[1]);

        if (sortedServices.length === 0) {
            serviceContainer.innerHTML = `<p class="text-muted">Wali ma jiro dakhli soo xarooday.</p>`;
        } else {
            sortedServices.forEach(([serviceName, amount]) => {
                const percentage = Math.round((amount / totalPaid) * 100);
                const item = document.createElement('div');
                item.className = 'service-progress-item';
                item.innerHTML = `
                    <div class="sp-header">
                        <span><i class="fa-solid fa-stethoscope" style="color: var(--primary); margin-right: 6px;"></i>${escapeHtml(serviceName)}</span>
                        <span class="sp-amount">$${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })} (${percentage}%)</span>
                    </div>
                    <div class="progress-bar-wrap">
                        <div class="progress-bar-fill" style="width: ${percentage}%;"></div>
                    </div>
                `;
                serviceContainer.appendChild(item);
            });
        }
    }

    // 2. Dakhliga ku saleysan Hababka Lacag-bixinta
    if (methodContainer) {
        methodContainer.innerHTML = '';
        const methodTotals = {};

        paidBillings.forEach(b => {
            const mName = b.paymentMethod || 'Kaash';
            methodTotals[mName] = (methodTotals[mName] || 0) + (parseFloat(b.amount) || 0);
        });

        const sortedMethods = Object.entries(methodTotals).sort((a, b) => b[1] - a[1]);

        if (sortedMethods.length === 0) {
            methodContainer.innerHTML = `<p class="text-muted">Wali ma jiraan lacago la bixiyey.</p>`;
        } else {
            sortedMethods.forEach(([methodName, amount]) => {
                const percentage = Math.round((amount / totalPaid) * 100);
                const item = document.createElement('div');
                item.className = 'service-progress-item';
                item.innerHTML = `
                    <div class="sp-header">
                        <span><i class="fa-solid fa-wallet" style="color: var(--success); margin-right: 6px;"></i>${escapeHtml(methodName)}</span>
                        <span class="sp-amount" style="color: var(--success-dark);">$${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })} (${percentage}%)</span>
                    </div>
                    <div class="progress-bar-wrap">
                        <div class="progress-bar-fill" style="width: ${percentage}%; background: linear-gradient(90deg, #10b981, #059669);"></div>
                    </div>
                `;
                methodContainer.appendChild(item);
            });
        }
    }
}

/* ==========================================================================
   12. MODAL-KA RASIIDKA & SLIPS-KA (PRINTABLE INVOICE & PAY SLIP)
   ========================================================================== */

function openReceiptModal(billingId) {
    const item = billings.find(b => b.id === billingId);
    if (!item) return;

    const modal = document.getElementById('receiptModal');
    if (!modal) return;

    document.getElementById('receiptNumber').textContent = '#' + item.receiptNumber;
    document.getElementById('receiptPatientName').textContent = item.patientName;
    document.getElementById('receiptDate').textContent = item.date;
    document.getElementById('receiptMethod').textContent = item.paymentMethod;

    const statusBadge = document.getElementById('receiptStatusBadge');
    if (statusBadge) {
        if (item.status === 'La Bixiyey') {
            statusBadge.className = 'badge badge-status-xaqiijiyey';
            statusBadge.innerHTML = '<i class="fa-solid fa-circle-check"></i> La Bixiyey';
        } else {
            statusBadge.className = 'badge badge-status-sugaya';
            statusBadge.innerHTML = '<i class="fa-solid fa-clock"></i> Sugaya (Qabyo)';
        }
    }

    document.getElementById('receiptService').textContent = item.service + (item.notes ? ` (${item.notes})` : '');
    document.getElementById('receiptSubtotal').textContent = `$${item.amount.toFixed(2)}`;
    document.getElementById('receiptTotal').textContent = `$${item.amount.toFixed(2)}`;

    modal.classList.add('open');
}
window.openReceiptModal = openReceiptModal;

function closeReceiptModal() {
    const modal = document.getElementById('receiptModal');
    if (modal) modal.classList.remove('open');
}
window.closeReceiptModal = closeReceiptModal;

function openSalarySlipModal(salaryId) {
    const item = salaries.find(s => s.id === salaryId);
    if (!item) return;

    const modal = document.getElementById('salarySlipModal');
    if (!modal) return;

    document.getElementById('slipId').textContent = '#' + item.slipId;
    document.getElementById('slipDoctorName').textContent = item.doctorName + ` (${item.specialty})`;
    document.getElementById('slipMonth').textContent = item.month;
    document.getElementById('slipMethod').textContent = item.paymentMethod;
    document.getElementById('slipDate').textContent = item.date;
    document.getElementById('slipBaseAmount').textContent = `$${item.baseAmount.toFixed(2)}`;
    document.getElementById('slipBonusAmount').textContent = `$${item.bonusAmount.toFixed(2)}`;
    document.getElementById('slipTotalAmount').textContent = `$${item.totalAmount.toFixed(2)}`;

    modal.classList.add('open');
}
window.openSalarySlipModal = openSalarySlipModal;

function closeSalarySlipModal() {
    const modal = document.getElementById('salarySlipModal');
    if (modal) modal.classList.remove('open');
}
window.closeSalarySlipModal = closeSalarySlipModal;

/* ==========================================================================
   9. MODAL-KA HUBINTA TIRTIRIDDA (DELETE CONFIRMATION MODAL)
   ========================================================================== */

function setupDeleteModal() {
    const modal = document.getElementById('deleteConfirmModal');
    const confirmBtn = document.getElementById('btnConfirmDelete');
    const cancelBtn = document.getElementById('btnCancelDelete');

    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            if (deleteTarget.type === 'patient') {
                patients = patients.filter(p => p.id !== deleteTarget.id);
                savePatientsToStorage();
                showToast('Xogta bukaanka si guul leh ayaa loo tirtiray!', 'info');
            } else if (deleteTarget.type === 'appointment') {
                appointments = appointments.filter(a => a.id !== deleteTarget.id);
                saveAppointmentsToStorage();
                showToast('Ballanta si guul leh ayaa loo tirtiray!', 'info');
            }

            closeDeleteModal();
            renderAll();
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeDeleteModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeDeleteModal();
            }
        });
    }
}

function openDeleteModal(type, id, message) {
    deleteTarget = { type, id };
    const modal = document.getElementById('deleteConfirmModal');
    const msgEl = document.getElementById('deleteModalMessage');

    if (msgEl) msgEl.textContent = message;
    if (modal) modal.classList.add('open');
}

function closeDeleteModal() {
    const modal = document.getElementById('deleteConfirmModal');
    if (modal) modal.classList.remove('open');
    deleteTarget = { type: null, id: null };
}

/* ==========================================================================
   10. DIB U CUSBOONAYSIINTA XOGTA TUSAALAHA (RESET DEMO DATA)
   ========================================================================== */

function setupResetButton() {
    const resetBtn = document.getElementById('btnResetData');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm('Ma hubtaa inaad dib u soo celiso xogtii hore ee tusaalaha ahayd? Wax kasta oo aad ku dartay dib baa loo bilaabi doonaa.')) {
                patients = [...DEFAULT_PATIENTS];
                doctors = [...DEFAULT_DOCTORS];
                appointments = [...DEFAULT_APPOINTMENTS];

                savePatientsToStorage();
                saveDoctorsToStorage();
                saveAppointmentsToStorage();

                renderAll();
                showToast('Xogtii tusaalaha ahayd si guul leh ayaa dib loogu soo celiyey!', 'success');
            }
        });
    }
}

/* ==========================================================================
   11. TOAST NOTIFICATIONS & VALIDATION HELPERS
   ========================================================================== */

/**
 * Muuji farriimaha guusha ama qaladka (Toast Notification)
 * @param {string} message - Farriinta
 * @param {'success'|'error'|'info'} type - Nooca farriinta
 */
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconClass = 'fa-solid fa-circle-check';
    if (type === 'error') iconClass = 'fa-solid fa-circle-exclamation';
    if (type === 'info') iconClass = 'fa-solid fa-circle-info';

    toast.innerHTML = `
        <div class="toast-icon">
            <i class="${iconClass}"></i>
        </div>
        <div class="toast-message">${escapeHtml(message)}</div>
    `;

    container.appendChild(toast);

    // Ka saar 4 ilbiriqsi kadib
    setTimeout(() => {
        toast.classList.add('toast-hiding');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 350);
    }, 4000);
}

function showFieldError(elementId, errorMessage) {
    const errEl = document.getElementById(elementId);
    if (errEl) {
        errEl.textContent = errorMessage;
    }
}

function clearFormErrors(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    const errors = form.querySelectorAll('.error-msg');
    errors.forEach(el => el.textContent = '');

    const inputs = form.querySelectorAll('.form-control');
    inputs.forEach(input => input.classList.remove('is-invalid'));
}

/**
 * Ka hortagga XSS (Escape HTML)
 */
function escapeHtml(text) {
    if (typeof text !== 'string') return text;
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
