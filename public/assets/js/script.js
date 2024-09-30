function fetchData() {
    axios.get('http://localhost:3000/api/services')
    .then(response =>{
        console.log(response.data)
        const data = response.data
        const tbody = $('#data-body')
    tbody.empty();
    const rows = data.map(item => `
        <tr>
            <th>${item.id}</th>
            <th>${item.title}</th>
            <th>${item.description}</th>
            <th>${item.description2}</th>
            <th>${item.images}</th>
            <th>
                <button type="button" class="btn btn-primary btn-sm" onclick="editData(${item.id})" data-toggle="modal" data-target="#exampleModal2">
                    <span class="glyphicon glyphicon-pencil"></span>
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteData(${item.id})">
                    <span class="glyphicon glyphicon-trash"></span>
                </button>
            </th>
        </tr>
    `).join('') 
    
    tbody.append(rows)
    
}).catch(error =>{
    console.log(error)
})
}

    fetchData()


function addData() {
const title = $('#title').val()
const description = $('#description').val()
const description2 = $('#description2').val()
const images = $('#images').val()

axios.post('http://localhost:3000/api/services/create', { title, description, description2, images })
    .then(response => {
        console.log('Kayıt eklendi:', response.data)
        $('#exampleModal').modal('hide')
        fetchData()
    })
    .catch(error => {
        console.error('Hata:', error)
    });
}

function deleteData(id) {
const confirmation = confirm(`ID: ${id} olan veriyi silmek istediğinizden emin misiniz?`)
if (confirmation) {
    axios.delete(`http://localhost:3000/api/services/delete/${id}`)
        .then(response => {
            console.log(`Silme başarılı: ${id}`)
            fetchData()
        })
        .catch(error => {
            console.log(error)
        });
}
}

function editData(id) {
axios.get(`http://localhost:3000/api/services/${id}`)
    .then(response => {
        const item = response.data
        $('#editId').val(item.id)
        $('#edittitle').val(item.title)
        $('#editdescription').val(item.description)
        $('#editdescription2').val(item.description2)
        $('#editimage').val(item.images)
    })
    .catch(error => {
        console.log(error)
    })
}

function updateData() {
const id = $('#editId').val()
const title = $('#edittitle').val()
const description = $('#editdescription').val()
const description2 = $('#editdescription2').val()
const images = $('#editimage').val()

axios.put(`http://localhost:3000/api/services/edit/${id}`, { title, description, description2, images })
    .then(response => {
        console.log(`Düzenleme başarılı: ${id}`)
        fetchData()
        $('#exampleModal2').modal('hide')
    })
    .catch(error => {
        console.log(error)
    });
}