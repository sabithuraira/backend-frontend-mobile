<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Todo;
use Validator;
use Illuminate\Support\Facades\Crypt;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        $datas = Todo::orderBy('id', 'DESC')->paginate(20);

        return response()->json([
            'status'    => 'success',
            'result'    => $datas
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'title' => 'required|string'
        ]);

        if($validator->fails()){
            return response()->json([
                'status'    => 'error', 
                'result'    => $validator->errors(),
            ]);
        }

        $model = new Todo;
        $model->title = $request->title;
        $model->description = $request->description;
        $model->save();

        return response()->json([
            'status'    => 'success', 
            'result'    => $model,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id){
        try{
            $decryptId = Crypt::decryptString($id);
            $model = Todo::find($decryptId);

            return response()->json([
                'status'    => 'success', 
                'result'    => $model,
            ]);
        }
        catch(\Illuminate\Contracts\Encryption\DecryptException $e){
            return response()->json([
                'status'    => 'error', 
                'result'    => $e,
            ]);
        }
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id){
        $validator = Validator::make($request->all(), [
            'title' => 'required|string'
        ]);

        if($validator->fails()){
            return response()->json([
                'status'    => 'error', 
                'result'    => $validator->errors(),
            ]);
        }

        try{
            $decryptId = Crypt::decryptString($id);
            $model = Todo::find($decryptId);
            $model->title = $request->title;
            $model->description = $request->description;
            $model->save();

            return response()->json([
                'status'    => 'success', 
                'result'    => $model,
            ]);
        }
        catch(\Illuminate\Contracts\Encryption\DecryptException $e){
            return response()->json([
                'status'    => 'error', 
                'result'    => $e,
            ]);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id){
        try{
            $decryptId = Crypt::decryptString($id);
            $model = Todo::find($decryptId);
            $model->delete();

            return response()->json([
                'status'    => 'success', 
                'result'    => 'Data berhasil dihapus',
            ]);
        }
        catch(\Illuminate\Contracts\Encryption\DecryptException $e){
            return response()->json([
                'status'    => 'error', 
                'result'    => $e,
            ]);
        }
    }
}
