
   // 1. Dữ liệu giả lập cho Biểu đồ
        const barData = [
            { day: 'T2', value: 2000000 },
            { day: 'T3', value: 3500000 },
            { day: 'T4', value: 2800000 },
            { day: 'T5', value: 4500000 },
            { day: 'T6', value: 3200000 },
            { day: 'T7', value: 5500000 }, // Cao nhất
            { day: 'CN', value: 4000000 }
        ];

        // 2. Dữ liệu giả lập cho Ngân sách
        const budgetData = [
            { category: 'Ăn uống', percent: 78, status: 'warning' },
            { category: 'Di chuyển', percent: 52, status: 'normal' },
            { category: 'Mua sắm', percent: 91, status: 'warning' }
        ];

        // Hàm render Biểu đồ cột
        function renderBarChart() {
            const chartContainer = document.getElementById('barChart');
            const maxValue = Math.max(...barData.map(item => item.value));
            
            barData.forEach(item => {
                const heightPercent = (item.value / maxValue) * 100;
                
                const wrapper = document.createElement('div');
                wrapper.className = 'bar-wrapper';
                
                const bar = document.createElement('div');
                bar.className = 'bar';
                bar.style.height = `${heightPercent}%`;
                bar.title = `${item.day}: ${item.value.toLocaleString('vi-VN')} đ`;
                
                const label = document.createElement('span');
                label.className = 'bar-label';
                label.textContent = item.day;
                
                wrapper.appendChild(bar);
                wrapper.appendChild(label);
                chartContainer.appendChild(wrapper);
            });
        }

        // Hàm render Ngân sách
        function renderBudgets() {
            const budgetList = document.getElementById('budgetList');
            
            budgetData.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'budget-item';
                
                const progressClass = item.status === 'warning' ? 'progress-bar warning' : 'progress-bar';
                
                itemDiv.innerHTML = `
                    <div class="budget-info">
                        <span>${item.category}</span>
                        <span>${item.percent}%</span>
                    </div>
                    <div class="progress-bar-container">
                        <div class="${progressClass}" style="width: ${item.percent}%;"></div>
                    </div>
                    <div class="goal-meta" style="font-size: 11px; margin-top: 4px;">
                        <span>${item.percent}% hoàn thành</span>
                    </div>
                `;
                budgetList.appendChild(itemDiv);
            });
        }

        // Tương tác bộ lọc thời gian
        function initFilter() {
            const filter = document.getElementById('monthFilter');
            filter.addEventListener('change', (e) => {
                const value = e.target.value;
                const balanceEl = document.getElementById('balanceValue');
                const expenseEl = document.getElementById('expenseValue');
                const savingEl = document.getElementById('savingValue');

                if (value === 'last-month') {
                    balanceEl.textContent = '15.200.000 đ';
                    expenseEl.textContent = '10.500.000 đ';
                    savingEl.textContent = '3.800.000 đ';
                } else if (value === 'this-year') {
                    balanceEl.textContent = '125.000.000 đ';
                    expenseEl.textContent = '85.400.000 đ';
                    savingEl.textContent = '32.000.000 đ';
                } else {
                    balanceEl.textContent = '18.450.000 đ';
                    expenseEl.textContent = '12.680.000 đ';
                    savingEl.textContent = '4.200.000 đ';
                }
            });
        }

        // Khởi chạy khi trang đã tải xong
        document.addEventListener('DOMContentLoaded', () => {
            renderBarChart();
            renderBudgets();
            initFilter();
        });