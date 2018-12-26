<template>
    <div class="container">
        <div class="row mt-4">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">Users List</h3>
                  <div class="card-tools">
                      <button class="btn btn-success" data-toggle="modal" data-target="#addNew">
                          Add User
                          <i class="fas fa-user-plus"></i>
                        </button> 
                  </div>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table class="table table-hover">
                    <tbody><tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Type</th>
                      <th>Registered At</th>
                    </tr>

                    <tr v-for="user in users" :key="user.id">
                      <td>{{user.id}}</td>
                      <td>{{user.name}}</td>
                      <td>{{user.email}}</td>
                      <td>{{user.type | upText}}</td>
                      <td>{{user.created_at | myDate}}</td>
                      <td>
                          <a href="#">
                              <i class="fa fa-edit blue"></i>
                          </a>
                           / 
                          <a href="#">
                                <i class="fa fa-trash red"></i>
                          </a>
                      </td>
                    </tr>
                  </tbody></table>
                </div>
                <!-- /.card-body -->
              </div>
              <!-- /.card -->
            </div>
          </div>
          <!-- Modal -->
        <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="addNewLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="addNewLabel">Add New</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form @submit.prevent="createUser">
            <div class="modal-body">
                <div class="form-group">
                     <input v-model="form.name" type="text" name="name" id="name"
                     placeholder="Name"
                     class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                     <has-error :form="form" field="name"></has-error>
                </div>
                <div class="form-group">
                        <input v-model="form.email" type="email" name="email" id="email"
                        placeholder="Email Address"
                        class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                        <has-error :form="form" field="email"></has-error>
                </div>
                <div class="form-group">
                        <textarea v-model="form.bio" name="bio" id="bio"
                        placeholder="Short bio for user(optional)"
                        class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }">
                        <has-error :form="form" field="bio"></has-error></textarea>
                </div>
                <div class="form-group">
                        <select v-model="form.type" name="type" id="type"
                        class="form-control" :class="{ 'is-invalid': form.errors.has('type') }">
                            <option value="">Select User Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                            <option value="author">Author</option>
                        </select>
                        <has-error :form="form" field="type"></has-error>
                </div>
                <div class="form-group">
                        <input v-model="form.password" type="password" name="password" id="password"
                        placeholder="Enter Password"
                        class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                        <has-error :form="form" field="password"></has-error>
                </div>      
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Create</button>
            </div>
            </form>
          </div>
        </div>
        </div>
    </div>
</template>

<script>
    export default {

        data(){
            return{
                users : {},
                form:new Form({
                    name : '',
                    email : '',
                    password : '',
                    type : '',
                    bio : '',
                    photo : ''
                })
            }
        },
        methods:{
            loadUsers(){
                axios.get("api/user").then(({data}) => (this.users = data.data));
            },
            
            createUser(){
                this.$Progress.start()                  //Progress Bar
                this.form.post('api/user').then(()=>{

                    Fire.$emit('AfterCreate');          //To emit that an event has occured
                    $('#addNew').modal('hide')

                    toast({                             //Toaster
                        type: 'success',
                        title: 'User Created successfully'
                    })

                    this.$Progress.finish()
                })
                .catch(()=>{

                })

            }
        },
        created() {
            this.loadUsers();

            /** To listen an event and request accordingly */
            Fire.$on('AfterCreate',() => {
                this.loadUsers();
            });

            //setInterval(() => this.loadUsers(), 3000);        //To just send request every 3s.
        }
    }
</script>
