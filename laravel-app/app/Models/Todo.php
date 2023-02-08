<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;

class Todo extends Model{
    use HasFactory;

    protected $table = "todo";

    protected $appends = ['encId'];
    public function getEncIdAttribute(){
        return Crypt::encryptString($this->id);
    }
}
