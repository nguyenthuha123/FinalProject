import Chart from 'chart.js/auto'
  // Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const links = document.querySelectorAll('.sidebar ul li a');

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.color = 'yellow'; // Đổi màu chữ khi hover
        // Thêm các hiệu ứng khác tùy ý
    });

    link.addEventListener('mouseleave', () => {
        link.style.color = '#fff'; // Khôi phục màu chữ khi di chuột ra ngoài
        // Xóa các hiệu ứng khác nếu có
    });
});

  // Or with jQuery
  $('.dropdown-trigger').dropdown();

//edit dialog
const editBtn = document.getElementById('editBtn');
const editDialog = document.getElementById('editDialog');

editBtn.addEventListener('click', () => {
  editDialog.classList.add('active');
});

const editForm = document.getElementById('editForm');

editForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Handle form submission here, e.g., send data to server
  // For demonstration, we'll just close the dialog
  editDialog.classList.remove('active');
});

//pie chart
  // Dữ liệu biểu đồ
  var data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [{
        data: [10, 20, 30],
        backgroundColor: ["red", "blue", "yellow"]
    }]
};
// Tùy chọn biểu đồ
var options = {
    // Thêm cấu hình tùy chỉnh nếu cần thiết
};

// Lấy thẻ canvas
var ctx = document.getElementById('myPieChart').getContext('2d');

// Tạo biểu đồ tròn
var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: options
});


