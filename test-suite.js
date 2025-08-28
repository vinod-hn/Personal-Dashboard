// Dashboard Testing and Validation Script
class DashboardTester {
    constructor() {
        this.tests = [];
        this.passedTests = 0;
        this.failedTests = 0;
    }

    async runAllTests() {
        console.log('🧪 Starting Dashboard Tests...');
        
        // Test 1: Check if all required elements exist
        this.test('DOM Elements', () => {
            const requiredElements = [
                'header', 'sidebar', 'mainContent', 'dashboard',
                'totalUsers', 'totalOrders', 'totalRevenue', 'growthRate',
                'tasksList', 'revenueChart', 'userGrowthChart', 'taskDistributionChart'
            ];
            
            for (const id of requiredElements) {
                if (!document.getElementById(id)) {
                    throw new Error(`Missing element: ${id}`);
                }
            }
            return true;
        });

        // Test 2: Check CSS animations
        this.test('CSS Animations', () => {
            const style = getComputedStyle(document.body);
            const hasTransitions = style.getPropertyValue('transition-duration') !== '0s';
            return hasTransitions || document.querySelector('[class*="animate-"]') !== null;
        });

        // Test 3: Check responsive design
        this.test('Responsive Design', () => {
            const mediaQueries = Array.from(document.styleSheets).some(sheet => {
                try {
                    return Array.from(sheet.cssRules).some(rule => 
                        rule instanceof CSSMediaRule && 
                        rule.conditionText.includes('max-width')
                    );
                } catch (e) {
                    return false;
                }
            });
            return mediaQueries;
        });

        // Test 4: Check local storage
        this.test('Local Storage', () => {
            const testKey = 'dashboard-test';
            const testValue = 'test-value';
            localStorage.setItem(testKey, testValue);
            const retrieved = localStorage.getItem(testKey);
            localStorage.removeItem(testKey);
            return retrieved === testValue;
        });

        // Test 5: Check Chart.js integration
        this.test('Chart.js Integration', () => {
            return typeof Chart !== 'undefined' && Chart.version;
        });

        // Test 6: Check theme toggle
        this.test('Theme System', () => {
            const themeToggle = document.getElementById('themeToggle');
            return themeToggle !== null;
        });

        // Test 7: Check sidebar navigation
        this.test('Navigation System', () => {
            const sidebarLinks = document.querySelectorAll('.sidebar__link');
            return sidebarLinks.length > 0;
        });

        // Test 8: Check form validation
        this.test('Form Elements', () => {
            const forms = document.querySelectorAll('form');
            const inputs = document.querySelectorAll('input, textarea, select');
            return forms.length > 0 && inputs.length > 0;
        });

        // Run performance test
        this.performanceTest();

        // Display results
        this.displayResults();
    }

    test(name, testFunction) {
        try {
            const result = testFunction();
            if (result) {
                console.log(`✅ ${name}: PASSED`);
                this.passedTests++;
            } else {
                console.log(`❌ ${name}: FAILED`);
                this.failedTests++;
            }
            this.tests.push({ name, status: result ? 'PASSED' : 'FAILED' });
        } catch (error) {
            console.log(`❌ ${name}: FAILED - ${error.message}`);
            this.failedTests++;
            this.tests.push({ name, status: 'FAILED', error: error.message });
        }
    }

    performanceTest() {
        const start = performance.now();
        
        // Measure initial render time
        requestAnimationFrame(() => {
            const renderTime = performance.now() - start;
            const isGoodPerformance = renderTime < 100; // Less than 100ms
            
            console.log(`⚡ Performance: ${renderTime.toFixed(2)}ms ${isGoodPerformance ? '(Good)' : '(Needs improvement)'}`);
            this.tests.push({ 
                name: 'Performance', 
                status: isGoodPerformance ? 'PASSED' : 'WARNING',
                value: `${renderTime.toFixed(2)}ms`
            });
        });
    }

    displayResults() {
        const total = this.passedTests + this.failedTests;
        const successRate = (this.passedTests / total * 100).toFixed(1);
        
        console.log('\n📊 Test Results Summary:');
        console.log(`Total Tests: ${total}`);
        console.log(`Passed: ${this.passedTests}`);
        console.log(`Failed: ${this.failedTests}`);
        console.log(`Success Rate: ${successRate}%`);
        
        // Create visual summary
        this.createVisualSummary(successRate);
    }

    createVisualSummary(successRate) {
        const summaryDiv = document.createElement('div');
        summaryDiv.id = 'test-summary';
        summaryDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7));
            backdrop-filter: blur(10px);
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.1);
            z-index: 10000;
            max-width: 300px;
            font-family: system-ui, -apple-system, sans-serif;
            border: 1px solid rgba(255,255,255,0.3);
        `;

        const successColor = successRate >= 90 ? '#10b981' : successRate >= 70 ? '#f59e0b' : '#ef4444';
        
        summaryDiv.innerHTML = `
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
                <div style="width: 40px; height: 40px; background: ${successColor}; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                    <span style="color: white; font-weight: bold;">${successRate >= 90 ? '✓' : successRate >= 70 ? '!' : '✗'}</span>
                </div>
                <div>
                    <h3 style="margin: 0; color: #1f2937; font-size: 16px;">Dashboard Test</h3>
                    <p style="margin: 0; color: #6b7280; font-size: 14px;">${successRate}% Success Rate</p>
                </div>
            </div>
            <div style="background: #f9fafb; border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span style="color: #374151; font-size: 14px;">Passed:</span>
                    <span style="color: #10b981; font-weight: bold;">${this.passedTests}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span style="color: #374151; font-size: 14px;">Failed:</span>
                    <span style="color: #ef4444; font-weight: bold;">${this.failedTests}</span>
                </div>
            </div>
            <button onclick="this.parentElement.remove()" style="
                width: 100%;
                background: ${successColor};
                color: white;
                border: none;
                border-radius: 6px;
                padding: 8px 16px;
                cursor: pointer;
                font-size: 14px;
                transition: opacity 0.2s;
            " onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">
                Close
            </button>
        `;

        document.body.appendChild(summaryDiv);

        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (summaryDiv.parentElement) {
                summaryDiv.remove();
            }
        }, 10000);
    }
}

// Feature Detection and Enhancement
class DashboardEnhancer {
    constructor() {
        this.features = {
            animations: this.supportsAnimations(),
            backdrop: this.supportsBackdropFilter(),
            customProperties: this.supportsCustomProperties(),
            intersectionObserver: 'IntersectionObserver' in window,
            localStorage: 'localStorage' in window
        };
    }

    supportsAnimations() {
        const element = document.createElement('div');
        return 'animation' in element.style;
    }

    supportsBackdropFilter() {
        const element = document.createElement('div');
        return 'backdropFilter' in element.style || 'webkitBackdropFilter' in element.style;
    }

    supportsCustomProperties() {
        return window.CSS && window.CSS.supports && window.CSS.supports('color', 'var(--fake-var)');
    }

    enhance() {
        console.log('🚀 Enhancing dashboard with available features...');
        
        if (!this.features.animations) {
            console.warn('⚠️ CSS Animations not supported - using fallbacks');
            document.body.classList.add('no-animations');
        }

        if (!this.features.backdrop) {
            console.warn('⚠️ Backdrop filter not supported - using solid backgrounds');
            document.body.classList.add('no-backdrop');
        }

        if (!this.features.intersectionObserver) {
            console.warn('⚠️ Intersection Observer not supported - disabling scroll animations');
            document.body.classList.add('no-scroll-animations');
        }

        // Add feature classes to body for conditional styling
        Object.entries(this.features).forEach(([feature, supported]) => {
            document.body.classList.add(supported ? `has-${feature}` : `no-${feature}`);
        });

        console.log('✨ Dashboard enhancement complete!');
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const enhancer = new DashboardEnhancer();
        enhancer.enhance();
        
        const tester = new DashboardTester();
        setTimeout(() => tester.runAllTests(), 1000);
    });
} else {
    const enhancer = new DashboardEnhancer();
    enhancer.enhance();
    
    const tester = new DashboardTester();
    setTimeout(() => tester.runAllTests(), 1000);
}
