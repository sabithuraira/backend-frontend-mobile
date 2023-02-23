<script>
// @ts-nocheck

    import { onMount } from "svelte";
    import { Container, Table, Button, 
        Modal, ModalBody, ModalHeader, ModalFooter } from "sveltestrap";
    import axios from "axios";

    let todos = [];
    let isOpen = false;

    let formTodo = {
        id: 0,
        title: '',
        description: ''
    }

    const emptyForm = () => {
        formTodo = {
            id: 0,
            title: '',
            description: ''
        }
    }

    const addTodo = () =>  {
        emptyForm();
        isOpen = true;
    }

    const editTodo = (data) => {
        formTodo = {
            id: data.id,
            title: data.title,
            description: data.description
        }
        isOpen = true;
    }

    const closeToogle = () => {
        isOpen = false
    }

    const getTodos = async() => {
        await axios.get("http://localhost:3000/todo")
                .then(({data}) => {
                    todos = data
                })
                .catch(({ response}) => {
                    console.log(response)
                })
    };

    const saveData = () => {
        if(formTodo.title==''){
            alert("Title is required");
        }
        else{
            if(formTodo.id==0){//STORE
                axios.post('http://localhost:3000/todo', {
                    title: formTodo.title,
                    description: formTodo.description
                })
                .then(({data}) => {
                    emptyForm()
                    getTodos()
                    isOpen = false;
                    alert("Data has been saved")
                })
            }
            else{ //UPDATE
                axios.patch('http://localhost:3000/todo/' + formTodo.id , {
                    title: formTodo.title,
                    description: formTodo.description
                })
                .then(({data}) => {
                    emptyForm()
                    getTodos()
                    isOpen = false;
                    alert("Data has been saved")
                })
            }
        }
    }

    const deleteData = (id) => {
        if(confirm('Are you sure want to delete this data?')){
            axios.delete('http://localhost:3000/todo/' + id)
                .then(({data}) => {
                    emptyForm()
                    getTodos()
                    isOpen = false;
                    alert("Data has been deleted")
                })
        }
    }

    onMount(getTodos);
</script>

<Container>
    <h1>Haiii.. Welcomee..</h1>
    <Button color='primary' on:click="{addTodo}" class="mb-2">Add Todo</Button>

    <Table bordered>
        <thead>
            <th>#</th>
            <th class="text-center">Title</th>
            <th class="text-center">Description</th>
            <th class="text-center">Action</th>
        </thead>

        <tbody>
            {#each todos as data, i}
                <tr>
                    <td>{i+1}</td>
                    <td>{ data.title }</td>
                    <td>{ data.description }</td>
                    <td>
                        <Button on:click="{editTodo(data)}" color='primary'>Edit</Button>
                        <Button on:click="{deleteData(data.id)}" color='danger'>Delete</Button>
                    </td>
                </tr>
            {/each}
        </tbody>
    </Table>

    <Modal isOpen={isOpen}>
        <ModalHeader>Form Todo</ModalHeader>

        <ModalBody>
            <div class="form-group">
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label>Title</label>
                <input type="text" class="form-control" bind:value={formTodo.title} />
            </div>

            <div class="form-group">
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label>Description</label>
                <input type="text" class="form-control" bind:value={formTodo.description} />
            </div>
        </ModalBody>

        <ModalFooter>
            <Button on:click="{saveData}" color="primary">Submit</Button>
            <Button on:click="{closeToogle}" color="secondary">Close</Button>
        </ModalFooter>
    </Modal>
</Container>
