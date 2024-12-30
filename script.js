const recordForm = document.getElementById("record-form");
const recordList = document.getElementById("record-list");
const reviewList = document.getElementById("review-list");
const reviewCycleInput = document.getElementById("review-cycle");

// 初期化
let records = JSON.parse(localStorage.getItem("records")) || [];
let reviewCycle = parseInt(localStorage.getItem("reviewCycle"), 10) || 7;

reviewCycleInput.value = reviewCycle;

// 学習記録を保存
recordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = document.getElementById("study-content").value;
    const date = new Date().toISOString().split("T")[0];
    records.push({ content, date });
    localStorage.setItem("records", JSON.stringify(records));
    renderRecords();
    recordForm.reset();
});

// 復習サイクルを設定
reviewCycleInput.addEventListener("change", () => {
    reviewCycle = parseInt(reviewCycleInput.value, 10);
    localStorage.setItem("reviewCycle", reviewCycle);
    renderReviews();
});

// 学習記録を表示
function renderRecords() {
    recordList.innerHTML = records
        .map((record) => `<li>${record.date}: ${record.content}</li>`)
        .join("");
}

// 復習リストを表示
function renderReviews() {
    const today = new Date();
    const reviews = records.filter((record) => {
        const recordDate = new Date(record.date);
        const diff = Math.ceil((today - recordDate) / (1000 * 60 * 60 * 24));
        return diff === reviewCycle;
    });
    reviewList.innerHTML = reviews
        .map((record) => `<li>${record.date}: ${record.content}</li>`)
        .join("");
}

// 初期描画
renderRecords();
renderReviews();
