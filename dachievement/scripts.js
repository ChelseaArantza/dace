$(document).ready(function() {
    window.onload = function seedingData(){
        data.push({NIM: "67564", Name: "Davis", Address: "Tangerang", Points: "5"})
        data.push({NIM: "72671", Name: "Airin", Address: "Tangerang", Points: "7"})
        data.push({NIM: "87754", Name: "Evelyne", Address: "Tangerang", Points: "8"})
        data.push({NIM: "96816", Name: "Chelsea", Address: "Tangerang", Points: "10"})
        updateTable();
        $('#addModal').modal('hide');
    }

    let dataTable = $('#dataTable').DataTable({
        ordering: false,
        columns: [
            { data: 'NIM' },
            { data: 'Name' },
            { data: 'Address' },
            { data: 'Points' },
            {
                data: null,
                render: function(data, type, row) {
                    return '<button class="btn btn-primary btn-sm editBtn">Edit</button> <button class="btn btn-danger btn-sm deleteBtn">Delete</button>';
                    
                }
            }
        ]
    });
 
    let data = [];

    //add
    $('#saveBtn').on('click', function() {
        let nim = $('#nimInput').val().trim();
        let name = $('#nameInput').val().trim();
        let address = $('#addressInput').val().trim();
        let points = $('#pointsInput').val().trim();

        if (nim && name && address && points) {
            data.push({ NIM: nim, Name: name, Address: address, Points: points });
            updateTable();
            $('#addModal').modal('hide');
            $('#successAlert').modal('show');
            return;
        }
            $('#addModal').modal('hide');
        
        $('#warningAlert').modal('show');


    });


    //edit
    $('#dataTable tbody').on('click', '.editBtn', function() {
        let row = $(this).closest('tr');
        let index = row.index();
        let rowData = dataTable.row(index).data();

        $('#editNimInput').val(rowData.NIM);
        $('#editNameInput').val(rowData.Name);
        $('#editAddressInput').val(rowData.Address);
        $('#editPointsInput').val(rowData.Points);

        $('#editModal').modal('show');
    });

    $('#updateBtn').on('click', function() {
        let nim = $('#editNimInput').val();
        let name = $('#editNameInput').val();
        let address = $('#editAddressInput').val();
        let points = $('#editPointsInput').val();

        let index = data.findIndex(d => d.NIM === nim);
        if (index !== -1) {
            data[index] = { NIM: nim, Name: name, Address: address, Points: points };
            updateTable();
            $('#editModal').modal('hide');
            $('#editAlert').modal('show');
        }
    });

    //delete
    $('#dataTable tbody').on('click', '.deleteBtn', function() {
        let row = $(this).closest('tr');
        let index = row.index();
        data.splice(index, 1);
        updateTable();
        $('#deleteAlert').modal('show');
    });

       $(document).ready(function() {
      $('#usernameModal').modal('show');

      $('#saveUsernameBtn').click(function() {
        var username = $('#usernameInput').val();
         $("#displayedUsername").html(username);
        $('#usernameModal').modal('hide');
      });

      $('#usernameInput').keypress(function(e) {
        if (e.which == 13) { 
          $('#saveUsernameBtn').click();
        }
      });
    });

    function updateTable() {
        dataTable.clear().rows.add(data).draw();
    }
});
