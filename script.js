document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            } else {
                entry.target.classList.remove("active");
            }
        });
    }, observerOptions);

    document.querySelectorAll(".scroll-reveal").forEach((element) => {
        observer.observe(element);
    });

    const container = document.getElementById("order-items-container");
    const addItemBtn = document.getElementById("add-item-btn");
    const totalPriceElement = document.getElementById("total-price");

    document.addEventListener("click", function (e) {
        if (!e.target.matches('.select-selected')) {
            const items = document.querySelectorAll(".select-items");
            const selected = document.querySelectorAll(".select-selected");
            selected.forEach(el => el.classList.remove("select-arrow-active"));
            items.forEach(el => el.classList.add("select-hide"));
        }
    });

    if (container && addItemBtn && totalPriceElement) {
        const prices = {
            linden: 260,
            honeycomb: 350,
            creamed: 240,
        };

        function calculateTotal() {
            let total = 0;
            const rows = document.querySelectorAll(".order-row");

            rows.forEach((row) => {
                const product = row.querySelector(".product-select").value;
                const amount = parseInt(row.querySelector(".amount-input").value) || 0;
                total += prices[product] * amount;
            });

            totalPriceElement.textContent = total.toLocaleString("cs-CZ");
        }

        function updateAddButtonState() {
            if (document.querySelectorAll(".order-row").length >= 3) {
                addItemBtn.style.display = "none";
            } else {
                addItemBtn.style.display = "";
            }
        }

        function getAvailableProduct() {
            const allSelects = document.querySelectorAll(".product-select");
            const selectedValues = Array.from(allSelects).map(select => select.value);
            const allProducts = ["linden", "honeycomb", "creamed"];
            return allProducts.find(product => !selectedValues.includes(product));
        }

        function updateProductOptions() {
            const allSelects = document.querySelectorAll(".product-select");
            const selectedValues = Array.from(allSelects).map(select => select.value);

            allSelects.forEach(select => {
                Array.from(select.options).forEach(option => {
                    if (selectedValues.includes(option.value) && option.value !== select.value) {
                        option.disabled = true;
                    } else {
                        option.disabled = false;
                    }
                });

                const row = select.closest(".order-row");
                if (row) {
                    const customOptions = row.querySelectorAll(".select-items div");
                    customOptions.forEach(opt => {
                        const optValue = opt.getAttribute("data-value");
                        if (selectedValues.includes(optValue) && optValue !== select.value) {
                            opt.classList.add("disabled");
                        } else {
                            opt.classList.remove("disabled");
                        }
                    });
                }
            });
        }

        function createOrderRow() {
            if (document.querySelectorAll(".order-row").length >= 3) {
                return;
            }

            const row = document.createElement("div");
            row.className = "order-row";
            row.innerHTML = `
                <div class="custom-select-wrapper">
                    <select class="product-select" style="display: none;">
                        <option value="linden">Lípový med (260 Kč)</option>
                        <option value="honeycomb">Plástvový med (350 Kč)</option>
                        <option value="creamed">Pastovaný med (240 Kč)</option>
                    </select>
                    <div class="select-selected">Vyberte produkt</div>
                    <div class="select-items select-hide">
                        <div data-value="linden">Lípový med (260 Kč)</div>
                        <div data-value="honeycomb">Plástvový med (350 Kč)</div>
                        <div data-value="creamed">Pastovaný med (240 Kč)</div>
                    </div>
                </div>
                <input type="number" class="amount-input" min="1" max="5" value="1">
                <button type="button" class="remove-item-btn"><i class="fa-solid fa-trash"></i></button>
            `;

            const select = row.querySelector(".product-select");
            const selectSelected = row.querySelector(".select-selected");
            const selectItems = row.querySelector(".select-items");

            const availableProduct = getAvailableProduct();
            if (availableProduct) {
                select.value = availableProduct;
            }
            selectSelected.textContent = select.options[select.selectedIndex].textContent;

            selectSelected.addEventListener("click", function (e) {
                e.stopPropagation();
                const allItems = document.querySelectorAll(".select-items");
                const allSelected = document.querySelectorAll(".select-selected");
                allSelected.forEach(el => { if (el !== selectSelected) el.classList.remove("select-arrow-active"); });
                allItems.forEach(el => { if (el !== selectItems) el.classList.add("select-hide"); });

                selectItems.classList.toggle("select-hide");
                selectSelected.classList.toggle("select-arrow-active");
            });

            const options = selectItems.querySelectorAll("div");
            options.forEach(opt => {
                opt.addEventListener("click", function (e) {
                    e.stopPropagation();
                    if (this.classList.contains("disabled")) return;
                    select.value = this.getAttribute("data-value");
                    selectSelected.textContent = this.textContent;
                    selectItems.classList.add("select-hide");
                    selectSelected.classList.remove("select-arrow-active");
                    select.dispatchEvent(new Event("change"));
                });
            });

            select.addEventListener("change", () => {
                selectSelected.textContent = select.options[select.selectedIndex].textContent;
                updateProductOptions();
                calculateTotal();
            });

            const amountInput = row.querySelector(".amount-input");
            amountInput.addEventListener("input", () => {
                if (parseInt(amountInput.value) > 5) amountInput.value = 5;
                if (parseInt(amountInput.value) < 1 && amountInput.value !== "") amountInput.value = 1;
                calculateTotal();
            });

            row.querySelector(".remove-item-btn").addEventListener("click", () => {
                row.remove();
                updateProductOptions();
                calculateTotal();
                updateAddButtonState();
            });

            container.appendChild(row);
            updateProductOptions();
            calculateTotal();
            updateAddButtonState();
        }

        addItemBtn.addEventListener("click", createOrderRow);

        if (document.querySelectorAll(".order-row").length === 0) {
            createOrderRow();
        }

        const urlParams = new URLSearchParams(window.location.search);
        const selectedHoney = urlParams.get('honey');

        if (selectedHoney) {
            const firstSelect = container.querySelector('.product-select');
            if (firstSelect && Array.from(firstSelect.options).some(opt => opt.value === selectedHoney)) {
                firstSelect.value = selectedHoney;
                updateProductOptions();
                calculateTotal();
            }
        }
    }
});