<template>
    <main>
        <button type="button" @click="addTodo" class="btn btn-info m-2">
            + Add Todo
        </button>
        
        
        <table class="table">
            <tr>
                <th>No</th>
                <th>Title</th>
                <th>Description</th>
                <th colspan="2">Action</th>
            </tr>

            <tr v-for="(todo, idx) in todos">
                <td>{{ (idx+1) }}</td>
                <td>{{ todo.title }}</td>
                <td>{{ todo.description }}</td>
                <td>
                    <button type="button" @click="editTodo(todo)" class="btn btn-info">Edit</button>
                </td>
                <td>
                    <button type="button" @click="deleteTodo(todo.encId)" class="btn btn-danger">Delete</button>
                </td>
            </tr>
        </table>

        <!-- Modal -->
        <div class="modal" id="modal-form" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Form Todo</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Title</label>
                        <input type="text" class="form-control" v-model="form_todo.title" />
                    </div>

                    <div class="form-group">
                        <label>Description</label>
                        <textarea class="form-control"  v-model="form_todo.description"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" @click="saveTodo" class="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
    import axios from 'axios'
    import $ from 'jquery'

    export default{
        data(){
            return {
                todos: [],
                form_todo: {
                    encId: '',
                    title: '',
                    description: '',
                }
            }
        },
        methods: {
            async getList(){
                await axios.get('http://127.0.0.1:8000/api/todo')
                        .then(({data}) => {
                            this.todos = data.result.data;
                        })
                        .catch(({response}) => {
                            console.error(response);
                        });
            }, 
            emptyForm(){
                this.form_todo = {
                    encId: '',
                    title: '',
                    description: '',
                };
            },
            addTodo(){
                this.emptyForm();
                $("#modal-form").modal('show');
            },
            editTodo(todoObj){
                this.form_todo = {
                    encId: todoObj.encId,
                    title: todoObj.title,
                    description: todoObj.description
                }

                $("#modal-form").modal('show');
            },
            saveTodo(){
                if(this.form_todo.title==''){
                    alert("Title wajib diisi");
                }
                else{
                    if(this.form_todo.encId==''){ //STORE
                        axios.post('http://127.0.0.1:8000/api/todo', {
                                title: this.form_todo.title,
                                description: this.form_todo.description
                            }).
                            then(({data}) => {
                                if(data.status=='success'){
                                    this.emptyForm();
                                    this.getList();
                                    alert("Data berhasil disimpan");
                                }
                                else{
                                    console.log("Data gagal disimpan, silahkan ulangi lagi")
                                }

                                $("#modal-form").modal('hide');
                            });
                    }
                    else{ //UPDATE
                        axios.patch('http://127.0.0.1:8000/api/todo/' + this.form_todo.encId, {
                                title: this.form_todo.title,
                                description: this.form_todo.description
                            }).
                            then(({data}) => {
                                if(data.status=='success'){
                                    this.emptyForm();
                                    this.getList();
                                    alert("Data berhasil disimpan");
                                }
                                else{
                                    console.log("Data gagal disimpan, silahkan ulangi lagi")
                                }

                                $("#modal-form").modal('hide');
                            });
                    }
                }
            }, 
            deleteTodo(encId){
                if(confirm("Apakah anda yakin ingin menghapus data ini?")){
                    axios.delete('http://127.0.0.1:8000/api/todo/' + encId).
                        then(({data}) => {
                            if(data.status=='success'){
                                this.emptyForm();
                                this.getList();
                                alert("Data berhasil dihapus");
                            }
                            else{
                                console.log("Data gagal dihapus, silahkan ulangi lagi")
                            }
                        });
                }
            }
        }, 
        created(){
            this.getList();
        }
    }
</script>