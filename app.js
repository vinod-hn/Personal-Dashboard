// Application data and state management
class Dashboard {
    constructor() {
        this.data = this.getInitialData();
        this.currentSection = 'dashboard';
        this.charts = {};
        this.editingTaskId = null;
        
        this.init();
    }

    getInitialData() {
        // Check if data exists in localStorage, otherwise use default data
        const stored = localStorage.getItem('dashboardData');
        if (stored) {
            return JSON.parse(stored);
        }
        
        return {
            "user": {
                "name": "Alex Johnson",
                "email": "alex.johnson@example.com",
                "avatar": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%236366f1'/%3E%3Ctext x='50' y='60' font-family='Arial' font-size='40' fill='white' text-anchor='middle'%3EAJ%3C/text%3E%3C/svg%3E",
                "role": "Full Stack Developer",
                "location": "San Francisco, CA",
                "joinDate": "2023-01-15"
            },
            "dashboardStats": {
                "totalUsers": 2847,
                "totalOrders": 1205,
                "totalRevenue": 58249,
                "growthRate": 12.5
            },
            "tasks": [
                {
                    "id": 1,
                    "title": "Complete project documentation",
                    "description": "Finalize the technical documentation for the new dashboard feature",
                    "status": "pending",
                    "priority": "high",
                    "dueDate": "2025-08-30",
                    "category": "Work"
                },
                {
                    "id": 2,
                    "title": "Review code pull requests",
                    "description": "Review and approve pending pull requests from the development team",
                    "status": "completed",
                    "priority": "medium",
                    "dueDate": "2025-08-28",
                    "category": "Work"
                },
                {
                    "id": 3,
                    "title": "Plan weekend trip",
                    "description": "Research destinations and book accommodation for upcoming weekend getaway",
                    "status": "pending",
                    "priority": "low",
                    "dueDate": "2025-09-01",
                    "category": "Personal"
                }
            ],
            "chartData": {
                "monthlyRevenue": {
                    "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
                    "data": [45000, 48000, 52000, 49000, 55000, 58000, 62000, 58249]
                },
                "userGrowth": {
                    "labels": ["Week 1", "Week 2", "Week 3", "Week 4"],
                    "data": [150, 230, 180, 287]
                },
                "taskDistribution": {
                    "labels": ["Completed", "Pending", "In Progress"],
                    "data": [45, 25, 30]
                }
            },
            "preferences": {
                "theme": "light",
                "notifications": true,
                "autoSave": true,
                "language": "en"
            },
            "externalFeeds": {
                "xmlContent": "<?xml version='1.0' encoding='UTF-8'?><rss version='2.0'><channel><title>Tech News Feed</title><description>Latest technology news and updates</description><item><title>New JavaScript Framework Released</title><description>A revolutionary new framework promises to change web development</description><pubDate>2025-08-27</pubDate><link>https://example.com/news1</link></item><item><title>AI Integration in Web Development</title><description>How artificial intelligence is transforming the way we build websites</description><pubDate>2025-08-26</pubDate><link>https://example.com/news2</link></item><item><title>Mobile-First Design Trends</title><description>The latest trends in mobile-first responsive design for 2025</description><pubDate>2025-08-25</pubDate><link>https://example.com/news3</link></item></channel></rss>"
            }
        };
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }

    initializeApp() {
        this.setupEventListeners();
        this.loadUserInterface();
        this.initializeCharts();
        this.loadExternalFeeds();
        this.updateTime();
        this.applyTheme();
        this.initializeAnimations();
        
        // Update time every second
        setInterval(() => this.updateTime(), 1000);
    }

    initializeAnimations() {
        // Add stagger animation to stat cards
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('animate-fade-in-up');
        });

        // Add animation to sidebar links
        const sidebarLinks = document.querySelectorAll('.sidebar__link');
        sidebarLinks.forEach((link, index) => {
            link.style.animationDelay = `${index * 0.1}s`;
            link.classList.add('animate-slide-in-left');
        });

        // Add intersection observer for scroll animations
        this.setupScrollAnimations();

        // Add enhanced micro-interactions
        this.setupMicroInteractions();
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = '0s';
                    entry.target.classList.add('animate-fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all cards and sections
        document.querySelectorAll('.card, .section, .chart-container').forEach(el => {
            observer.observe(el);
        });
    }

    setupMicroInteractions() {
        // Add hover effects to interactive elements
        document.querySelectorAll('.btn').forEach(btn => {
            btn.classList.add('hover-lift');
        });

        document.querySelectorAll('.card').forEach(card => {
            card.classList.add('hover-lift');
        });

        // Add ripple effect to buttons
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', this.createRippleEffect);
        });

        // Add floating animation to stat cards
        document.querySelectorAll('.stat-card').forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-float');
            }, index * 200);
        });
    }

    createRippleEffect(e) {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';

        // Add CSS for ripple animation if not exists
        if (!document.getElementById('ripple-style')) {
            const style = document.createElement('style');
            style.id = 'ripple-style';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
                .btn {
                    position: relative;
                    overflow: hidden;
                }
            `;
            document.head.appendChild(style);
        }

        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }

    setupEventListeners() {
        // Navigation - Fixed event delegation
        const sidebarLinks = document.querySelectorAll('.sidebar__link');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const section = link.getAttribute('data-section');
                console.log('Navigating to section:', section); // Debug log
                this.navigateToSection(section);
            });
        });

        // Mobile menu toggle
        const menuToggle = document.getElementById('menuToggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                document.getElementById('sidebar').classList.toggle('open');
            });
        }

        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // Profile form
        const profileForm = document.getElementById('profileForm');
        if (profileForm) {
            profileForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveProfile();
            });
        }

        // Task management
        const addTaskBtn = document.getElementById('addTaskBtn');
        if (addTaskBtn) {
            addTaskBtn.addEventListener('click', () => {
                this.openTaskModal();
            });
        }

        const taskForm = document.getElementById('taskForm');
        if (taskForm) {
            taskForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveTask();
            });
        }

        // Modal controls
        const taskModalClose = document.getElementById('taskModalClose');
        if (taskModalClose) {
            taskModalClose.addEventListener('click', () => {
                this.closeTaskModal();
            });
        }

        const taskModalBackdrop = document.getElementById('taskModalBackdrop');
        if (taskModalBackdrop) {
            taskModalBackdrop.addEventListener('click', () => {
                this.closeTaskModal();
            });
        }

        const cancelTask = document.getElementById('cancelTask');
        if (cancelTask) {
            cancelTask.addEventListener('click', () => {
                this.closeTaskModal();
            });
        }

        // Task filters
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.filterTasks(e.target.dataset.filter);
            });
        });

        // Notification close
        const notificationClose = document.querySelector('.notification__close');
        if (notificationClose) {
            notificationClose.addEventListener('click', () => {
                this.hideNotification();
            });
        }
    }

    loadUserInterface() {
        // Load user info
        const userName = document.getElementById('userName');
        const welcomeUser = document.getElementById('welcomeUser');
        const userAvatar = document.getElementById('userAvatar');
        const profileAvatar = document.getElementById('profileAvatar');
        
        if (userName) userName.textContent = this.data.user.name;
        if (welcomeUser) welcomeUser.textContent = this.data.user.name.split(' ')[0];
        if (userAvatar) userAvatar.src = this.data.user.avatar;
        if (profileAvatar) profileAvatar.src = this.data.user.avatar;

        // Update greeting based on time
        this.updateGreeting();

        // Load profile form
        const profileName = document.getElementById('profileName');
        const profileEmail = document.getElementById('profileEmail');
        const profileRole = document.getElementById('profileRole');
        const profileLocation = document.getElementById('profileLocation');
        
        if (profileName) profileName.value = this.data.user.name;
        if (profileEmail) profileEmail.value = this.data.user.email;
        if (profileRole) profileRole.value = this.data.user.role;
        if (profileLocation) profileLocation.value = this.data.user.location;

        // Load dashboard stats with animation
        this.animateStats();

        // Load tasks
        this.renderTasks();

        // Add refresh button functionality
        const refreshBtn = document.getElementById('refreshData');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.refreshDashboard();
            });
        }

        // Add avatar change functionality
        const changeAvatarBtn = document.getElementById('changeAvatar');
        if (changeAvatarBtn) {
            changeAvatarBtn.addEventListener('click', () => {
                this.changeAvatar();
            });
        }
    }

    updateGreeting() {
        const greetingEl = document.getElementById('greeting');
        if (!greetingEl) return;

        const now = new Date();
        const hour = now.getHours();
        
        let greeting;
        if (hour < 12) {
            greeting = 'Good morning';
        } else if (hour < 17) {
            greeting = 'Good afternoon';
        } else {
            greeting = 'Good evening';
        }

        greetingEl.textContent = greeting;
    }

    async refreshDashboard() {
        const refreshBtn = document.getElementById('refreshData');
        const refreshIcon = refreshBtn?.querySelector('.refresh-icon');
        
        if (refreshIcon) {
            refreshIcon.style.animation = 'spin 1s linear infinite';
        }

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Refresh stats with slight variations
            this.data.dashboardStats.totalUsers += Math.floor(Math.random() * 10);
            this.data.dashboardStats.totalOrders += Math.floor(Math.random() * 5);
            this.data.dashboardStats.totalRevenue += Math.floor(Math.random() * 1000);
            this.data.dashboardStats.growthRate += (Math.random() - 0.5) * 2;
            
            // Re-animate stats
            this.animateStats();
            
            // Update charts
            if (this.charts.revenue) {
                const newRevenue = this.data.dashboardStats.totalRevenue;
                const data = [...this.data.chartData.monthlyRevenue.data];
                data[data.length - 1] = newRevenue;
                this.charts.revenue.data.datasets[0].data = data;
                this.charts.revenue.update();
            }
            
            this.saveData();
            this.showToast('Dashboard refreshed successfully!', 'success');
        } catch (error) {
            this.handleError(error, 'refreshing dashboard');
        } finally {
            if (refreshIcon) {
                refreshIcon.style.animation = '';
            }
        }
    }

    animateStats() {
        const stats = this.data.dashboardStats;
        
        this.animateNumber('totalUsers', 0, stats.totalUsers, 2000);
        this.animateNumber('totalOrders', 0, stats.totalOrders, 2000);
        this.animateNumber('totalRevenue', 0, stats.totalRevenue, 2000, '$');
        this.animateNumber('growthRate', 0, stats.growthRate, 2000, '', '%');
    }

    animateNumber(elementId, start, end, duration, prefix = '', suffix = '') {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current);
            if (elementId === 'totalRevenue') {
                displayValue = displayValue.toLocaleString();
            }
            element.textContent = prefix + displayValue + suffix;
        }, 16);
    }

    initializeCharts() {
        // Revenue chart
        const revenueCanvas = document.getElementById('revenueChart');
        if (revenueCanvas) {
            const revenueCtx = revenueCanvas.getContext('2d');
            this.charts.revenue = new Chart(revenueCtx, {
                type: 'line',
                data: {
                    labels: this.data.chartData.monthlyRevenue.labels,
                    datasets: [{
                        label: 'Monthly Revenue',
                        data: this.data.chartData.monthlyRevenue.data,
                        borderColor: '#1FB8CD',
                        backgroundColor: 'rgba(31, 184, 205, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return '$' + value.toLocaleString();
                                }
                            }
                        }
                    }
                }
            });
        }

        // User growth chart
        const userGrowthCanvas = document.getElementById('userGrowthChart');
        if (userGrowthCanvas) {
            const userGrowthCtx = userGrowthCanvas.getContext('2d');
            this.charts.userGrowth = new Chart(userGrowthCtx, {
                type: 'bar',
                data: {
                    labels: this.data.chartData.userGrowth.labels,
                    datasets: [{
                        label: 'New Users',
                        data: this.data.chartData.userGrowth.data,
                        backgroundColor: '#FFC185'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        }

        // Task distribution chart
        const taskDistCanvas = document.getElementById('taskDistributionChart');
        if (taskDistCanvas) {
            const taskDistCtx = taskDistCanvas.getContext('2d');
            this.charts.taskDistribution = new Chart(taskDistCtx, {
                type: 'pie',
                data: {
                    labels: this.data.chartData.taskDistribution.labels,
                    datasets: [{
                        data: this.data.chartData.taskDistribution.data,
                        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
    }

    navigateToSection(sectionName) {
        console.log('Switching to section:', sectionName); // Debug log
        
        // Update active states for sidebar links with animation
        const sidebarLinks = document.querySelectorAll('.sidebar__link');
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionName) {
                link.classList.add('active');
                // Add a subtle pulse animation to active link
                link.style.animation = 'pulse 0.3s ease-in-out';
                setTimeout(() => link.style.animation = '', 300);
            }
        });

        // Fade out current section
        const currentSection = document.querySelector('.section.active');
        if (currentSection) {
            currentSection.style.opacity = '0';
            currentSection.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                // Hide all sections
                const sections = document.querySelectorAll('.section');
                sections.forEach(section => {
                    section.classList.remove('active');
                    section.style.opacity = '';
                    section.style.transform = '';
                });
                
                // Show target section with animation
                const targetSection = document.getElementById(sectionName);
                if (targetSection) {
                    targetSection.classList.add('active');
                    targetSection.style.opacity = '0';
                    targetSection.style.transform = 'translateX(20px)';
                    
                    // Trigger animation
                    requestAnimationFrame(() => {
                        targetSection.style.transition = 'all 0.3s ease-in-out';
                        targetSection.style.opacity = '1';
                        targetSection.style.transform = 'translateX(0)';
                        
                        // Clean up styles after animation
                        setTimeout(() => {
                            targetSection.style.transition = '';
                            targetSection.style.opacity = '';
                            targetSection.style.transform = '';
                        }, 300);
                    });
                    
                    // Add stagger animation to child elements
                    const childElements = targetSection.querySelectorAll('.card, .stat-card, .chart-container');
                    childElements.forEach((el, index) => {
                        el.style.opacity = '0';
                        el.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            el.style.transition = 'all 0.4s ease-out';
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                            
                            setTimeout(() => {
                                el.style.transition = '';
                                el.style.opacity = '';
                                el.style.transform = '';
                            }, 400);
                        }, index * 100);
                    });
                    
                    console.log('Activated section:', sectionName); // Debug log
                } else {
                    console.error('Section not found:', sectionName); // Debug log
                }
            }, 150);
        } else {
            // No current section, just show target
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => section.classList.remove('active'));
            
            const targetSection = document.getElementById(sectionName);
            if (targetSection) {
                targetSection.classList.add('active');
                targetSection.classList.add('animate-fade-in-up');
            }
        }

        this.currentSection = sectionName;

        // Close mobile menu
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.remove('open');
        }

        // Initialize charts when switching to data section
        if (sectionName === 'data') {
            setTimeout(() => {
                this.initializeDataCharts();
            }, 100);
        }
    }

    initializeDataCharts() {
        // Initialize charts specific to the data visualization section
        const userGrowthCanvas = document.getElementById('userGrowthChart');
        const taskDistCanvas = document.getElementById('taskDistributionChart');
        
        if (userGrowthCanvas && !this.charts.userGrowth) {
            const userGrowthCtx = userGrowthCanvas.getContext('2d');
            this.charts.userGrowth = new Chart(userGrowthCtx, {
                type: 'bar',
                data: {
                    labels: this.data.chartData.userGrowth.labels,
                    datasets: [{
                        label: 'New Users',
                        data: this.data.chartData.userGrowth.data,
                        backgroundColor: '#FFC185'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        }

        if (taskDistCanvas && !this.charts.taskDistribution) {
            const taskDistCtx = taskDistCanvas.getContext('2d');
            this.charts.taskDistribution = new Chart(taskDistCtx, {
                type: 'pie',
                data: {
                    labels: this.data.chartData.taskDistribution.labels,
                    datasets: [{
                        data: this.data.chartData.taskDistribution.data,
                        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
    }

    toggleTheme() {
        const currentTheme = this.data.preferences.theme;
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        this.data.preferences.theme = newTheme;
        this.applyTheme();
        this.saveData();
    }

    applyTheme() {
        const theme = this.data.preferences.theme;
        document.documentElement.setAttribute('data-color-scheme', theme);
        
        const themeIcon = document.getElementById('themeIcon');
        if (themeIcon) {
            themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
        }
    }

    renderTasks(filter = 'all') {
        const tasksList = document.getElementById('tasksList');
        if (!tasksList) return;
        
        const tasks = this.data.tasks.filter(task => {
            if (filter === 'all') return true;
            return task.status === filter;
        });

        tasksList.innerHTML = tasks.map(task => `
            <div class="task-item ${task.status}" data-task-id="${task.id}">
                <div class="task-checkbox ${task.status === 'completed' ? 'checked' : ''}" onclick="app.toggleTaskStatus(${task.id})"></div>
                <div class="task-content">
                    <h4>${task.title}</h4>
                    <p>${task.description}</p>
                    <div class="task-meta">
                        <span class="task-priority ${task.priority}">${task.priority}</span>
                        <span class="task-due">Due: ${new Date(task.dueDate).toLocaleDateString()}</span>
                        <span class="task-category">${task.category}</span>
                    </div>
                </div>
                <div class="task-actions">
                    <button onclick="app.editTask(${task.id})" title="Edit">✏️</button>
                    <button onclick="app.deleteTask(${task.id})" title="Delete">🗑️</button>
                </div>
            </div>
        `).join('');
    }

    filterTasks(filter) {
        this.renderTasks(filter);
    }

    openTaskModal(taskId = null) {
        this.editingTaskId = taskId;
        const modal = document.getElementById('taskModal');
        const title = document.getElementById('taskModalTitle');
        
        if (!modal) return;
        
        if (taskId) {
            const task = this.data.tasks.find(t => t.id === taskId);
            if (title) title.textContent = 'Edit Task';
            
            const taskTitle = document.getElementById('taskTitle');
            const taskDescription = document.getElementById('taskDescription');
            const taskPriority = document.getElementById('taskPriority');
            const taskDueDate = document.getElementById('taskDueDate');
            const taskCategory = document.getElementById('taskCategory');
            
            if (taskTitle) taskTitle.value = task.title;
            if (taskDescription) taskDescription.value = task.description;
            if (taskPriority) taskPriority.value = task.priority;
            if (taskDueDate) taskDueDate.value = task.dueDate;
            if (taskCategory) taskCategory.value = task.category;
        } else {
            if (title) title.textContent = 'Add New Task';
            const taskForm = document.getElementById('taskForm');
            if (taskForm) taskForm.reset();
        }
        
        modal.classList.remove('hidden');
        modal.classList.add('visible');
    }

    closeTaskModal() {
        const modal = document.getElementById('taskModal');
        if (!modal) return;
        
        modal.classList.remove('visible');
        modal.classList.add('hidden');
        this.editingTaskId = null;
        setTimeout(() => {
            const taskForm = document.getElementById('taskForm');
            if (taskForm) taskForm.reset();
        }, 300);
    }

    saveTask() {
        const titleEl = document.getElementById('taskTitle');
        const descriptionEl = document.getElementById('taskDescription');
        const priorityEl = document.getElementById('taskPriority');
        const dueDateEl = document.getElementById('taskDueDate');
        const categoryEl = document.getElementById('taskCategory');
        
        if (!titleEl || !descriptionEl || !priorityEl || !dueDateEl || !categoryEl) {
            console.error('Task form elements not found');
            return;
        }
        
        const title = titleEl.value;
        const description = descriptionEl.value;
        const priority = priorityEl.value;
        const dueDate = dueDateEl.value;
        const category = categoryEl.value;

        if (!title.trim()) {
            this.showNotification('Please enter a task title', 'error');
            return;
        }

        if (this.editingTaskId) {
            // Update existing task
            const taskIndex = this.data.tasks.findIndex(t => t.id === this.editingTaskId);
            if (taskIndex !== -1) {
                this.data.tasks[taskIndex] = {
                    ...this.data.tasks[taskIndex],
                    title,
                    description,
                    priority,
                    dueDate,
                    category
                };
                this.showNotification('Task updated successfully');
            }
        } else {
            // Create new task
            const newTask = {
                id: Date.now(),
                title,
                description,
                status: 'pending',
                priority,
                dueDate,
                category
            };
            this.data.tasks.push(newTask);
            this.showNotification('Task created successfully');
        }

        this.renderTasks();
        this.updateTaskDistributionChart();
        this.closeTaskModal();
        this.saveData();
    }

    toggleTaskStatus(taskId) {
        const task = this.data.tasks.find(t => t.id === taskId);
        if (!task) return;
        
        task.status = task.status === 'completed' ? 'pending' : 'completed';
        this.renderTasks();
        this.updateTaskDistributionChart();
        this.saveData();
        this.showNotification(`Task ${task.status === 'completed' ? 'completed' : 'reopened'}`);
    }

    editTask(taskId) {
        this.openTaskModal(taskId);
    }

    deleteTask(taskId) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.data.tasks = this.data.tasks.filter(t => t.id !== taskId);
            this.renderTasks();
            this.updateTaskDistributionChart();
            this.saveData();
            this.showNotification('Task deleted successfully');
        }
    }

    updateTaskDistributionChart() {
        const completed = this.data.tasks.filter(t => t.status === 'completed').length;
        const pending = this.data.tasks.filter(t => t.status === 'pending').length;
        const inProgress = this.data.tasks.filter(t => t.status === 'in-progress').length;

        if (this.charts.taskDistribution) {
            this.charts.taskDistribution.data.datasets[0].data = [completed, pending, inProgress];
            this.charts.taskDistribution.update();
        }
    }

    saveProfile() {
        const nameEl = document.getElementById('profileName');
        const emailEl = document.getElementById('profileEmail');
        const roleEl = document.getElementById('profileRole');
        const locationEl = document.getElementById('profileLocation');
        
        if (!nameEl || !emailEl || !roleEl || !locationEl) {
            console.error('Profile form elements not found');
            return;
        }
        
        const name = nameEl.value;
        const email = emailEl.value;
        const role = roleEl.value;
        const location = locationEl.value;

        if (!name.trim() || !email.trim()) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }

        this.data.user.name = name;
        this.data.user.email = email;
        this.data.user.role = role;
        this.data.user.location = location;

        // Update UI
        const userName = document.getElementById('userName');
        const welcomeUser = document.getElementById('welcomeUser');
        
        if (userName) userName.textContent = name;
        if (welcomeUser) welcomeUser.textContent = name.split(' ')[0];

        this.saveData();
        this.showToast('Profile updated successfully!', 'success');
    }

    changeAvatar() {
        // Create avatar selection modal
        const avatars = [
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%236366f1'/%3E%3Ctext x='50' y='60' font-family='Arial' font-size='40' fill='white' text-anchor='middle'%3E👤%3C/text%3E%3C/svg%3E",
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23f59e0b'/%3E%3Ctext x='50' y='60' font-family='Arial' font-size='40' fill='white' text-anchor='middle'%3E🚀%3C/text%3E%3C/svg%3E",
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%2310b981'/%3E%3Ctext x='50' y='60' font-family='Arial' font-size='40' fill='white' text-anchor='middle'%3E⭐%3C/text%3E%3C/svg%3E",
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23ef4444'/%3E%3Ctext x='50' y='60' font-family='Arial' font-size='40' fill='white' text-anchor='middle'%3E🎯%3C/text%3E%3C/svg%3E",
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%238b5cf6'/%3E%3Ctext x='50' y='60' font-family='Arial' font-size='40' fill='white' text-anchor='middle'%3E💎%3C/text%3E%3C/svg%3E",
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%2306b6d4'/%3E%3Ctext x='50' y='60' font-family='Arial' font-size='40' fill='white' text-anchor='middle'%3E🌟%3C/text%3E%3C/svg%3E"
        ];

        // Create modal HTML
        const modalHTML = `
            <div class="avatar-modal" id="avatarModal">
                <div class="modal__backdrop" onclick="this.parentElement.remove()"></div>
                <div class="modal__content" style="max-width: 500px;">
                    <div class="modal__header">
                        <h3>Choose Your Avatar</h3>
                        <button class="modal__close" onclick="this.closest('.avatar-modal').remove()">&times;</button>
                    </div>
                    <div class="modal__body">
                        <div class="avatar-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 20px 0;">
                            ${avatars.map((avatar, index) => 
                                `<div class="avatar-option" data-avatar="${avatar}" style="
                                    width: 80px; 
                                    height: 80px; 
                                    border-radius: 50%; 
                                    cursor: pointer; 
                                    border: 3px solid transparent; 
                                    transition: all 0.3s ease;
                                    overflow: hidden;
                                    position: relative;
                                    background: var(--glass-bg-light);
                                    backdrop-filter: blur(10px);
                                ">
                                    <img src="${avatar}" alt="Avatar ${index + 1}" style="
                                        width: 100%; 
                                        height: 100%; 
                                        border-radius: 50%;
                                        transition: transform 0.3s ease;
                                    ">
                                </div>`
                            ).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add modal to DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Add click handlers for avatar selection
        const avatarOptions = document.querySelectorAll('.avatar-option');
        avatarOptions.forEach(option => {
            option.addEventListener('click', () => {
                const selectedAvatar = option.dataset.avatar;
                this.updateAvatar(selectedAvatar);
                document.getElementById('avatarModal').remove();
            });

            // Add hover effects
            option.addEventListener('mouseenter', () => {
                option.style.borderColor = 'var(--color-primary)';
                option.style.boxShadow = '0 0 20px rgba(var(--color-teal-500-rgb), 0.4)';
                option.querySelector('img').style.transform = 'scale(1.1)';
            });

            option.addEventListener('mouseleave', () => {
                option.style.borderColor = 'transparent';
                option.style.boxShadow = 'none';
                option.querySelector('img').style.transform = 'scale(1)';
            });
        });

        // Animate modal entrance
        const modal = document.getElementById('avatarModal');
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.9)';
        requestAnimationFrame(() => {
            modal.style.transition = 'all 0.3s ease';
            modal.style.opacity = '1';
            modal.style.transform = 'scale(1)';
        });
    }

    updateAvatar(avatarUrl) {
        this.data.user.avatar = avatarUrl;
        
        // Update all avatar elements
        const userAvatar = document.getElementById('userAvatar');
        const profileAvatar = document.getElementById('profileAvatar');
        
        if (userAvatar) userAvatar.src = avatarUrl;
        if (profileAvatar) profileAvatar.src = avatarUrl;
        
        this.saveData();
        this.showToast('Avatar updated successfully!', 'success');
    }

    loadExternalFeeds() {
        const feedsContainer = document.getElementById('feedsContent');
        if (!feedsContainer) return;
        
        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(this.data.externalFeeds.xmlContent, 'text/xml');
            
            // Check for parsing errors
            const parseError = xmlDoc.querySelector('parsererror');
            if (parseError) {
                throw new Error('XML parsing failed');
            }
            
            const items = xmlDoc.querySelectorAll('item');
            let feedsHTML = '';
            
            items.forEach(item => {
                const titleEl = item.querySelector('title');
                const descriptionEl = item.querySelector('description');
                const pubDateEl = item.querySelector('pubDate');
                const linkEl = item.querySelector('link');
                
                if (titleEl && descriptionEl && pubDateEl && linkEl) {
                    const title = titleEl.textContent;
                    const description = descriptionEl.textContent;
                    const pubDate = pubDateEl.textContent;
                    const link = linkEl.textContent;
                    
                    feedsHTML += `
                        <div class="feed-item">
                            <h3>${title}</h3>
                            <p>${description}</p>
                            <div class="feed-meta">
                                <span>${new Date(pubDate).toLocaleDateString()}</span>
                                <a href="${link}" target="_blank">Read more</a>
                            </div>
                        </div>
                    `;
                }
            });
            
            feedsContainer.innerHTML = feedsHTML;
        } catch (error) {
            console.error('Error parsing XML feeds:', error);
            feedsContainer.innerHTML = '<div class="loading">Error loading feeds. Please try again later.</div>';
        }
    }

    updateTime() {
        const currentTimeEl = document.getElementById('currentTime');
        if (!currentTimeEl) return;
        
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour12: true,
            hour: 'numeric',
            minute: '2-digit'
        });
        const dateString = now.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
        
        currentTimeEl.innerHTML = `
            <div style="text-align: right;">
                <div>${timeString}</div>
                <div style="font-size: 11px; opacity: 0.8;">${dateString}</div>
            </div>
        `;
    }

    showNotification(message, type = 'success') {
        // Use modern toast notification instead
        this.showToast(message, type);
        
        // Keep old notification system as fallback
        const notification = document.getElementById('notification');
        const messageEl = notification.querySelector('.notification__message');
        
        if (!notification || !messageEl) return;
        
        messageEl.textContent = message;
        notification.classList.remove('hidden');
        notification.classList.add('visible');
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            this.hideNotification();
        }, 3000);
    }

    showToast(message, type = 'info', duration = 4000) {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const iconMap = {
            success: '✓',
            error: '✗',
            warning: '⚠',
            info: 'ℹ'
        };

        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-icon">${iconMap[type] || iconMap.info}</span>
                <p class="toast-message">${message}</p>
            </div>
            <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
        `;

        toastContainer.appendChild(toast);

        // Add animation
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(0)';
        });

        // Auto remove
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.remove();
                }
            }, 300);
        }, duration);
    }

    showLoading(show = true) {
        const overlay = document.getElementById('loadingOverlay');
        if (!overlay) return;

        if (show) {
            overlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        } else {
            overlay.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }

    // Enhanced error handling
    handleError(error, context = '') {
        console.error(`Error ${context}:`, error);
        this.showToast(`An error occurred ${context}. Please try again.`, 'error');
        this.showLoading(false);
    }

    // Simulate async operations with loading states
    async simulateAsyncOperation(operation, loadingMessage = 'Loading...') {
        this.showLoading(true);
        try {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            const result = await operation();
            this.showLoading(false);
            return result;
        } catch (error) {
            this.handleError(error, loadingMessage);
            throw error;
        }
    }

    hideNotification() {
        const notification = document.getElementById('notification');
        if (!notification) return;
        
        notification.classList.remove('visible');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 300);
    }

    saveData() {
        try {
            localStorage.setItem('dashboardData', JSON.stringify(this.data));
        } catch (error) {
            console.error('Error saving data to localStorage:', error);
        }
    }
}

// Initialize the application
let app;

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new Dashboard();
        window.app = app;
    });
} else {
    app = new Dashboard();
    window.app = app;
}