
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

//user layout dropdown for form leave
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;
for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}
//search for hompage user


