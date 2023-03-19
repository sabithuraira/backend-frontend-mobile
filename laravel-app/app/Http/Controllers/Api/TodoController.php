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
     * @OA\Get(
     *     path="/api/todo",
     *     tags={"Todo"},
     *     summary="Get List Todo Data",
     *     description="enter your description here",
     *     operationId="todo",
     *     @OA\Response(
     *         response="default",
     *         description="return array model todo"
     *     )
     * )
     */
    public function index(){
        $datas = Todo::orderBy('id', 'DESC')->paginate(20);

        return response()->json([
            'status'    => 'success',
            'result'    => $datas
        ]);
    }

     /**
     * @OA\Post(
     *     path="/api/todo",
     *     tags={"Todo"},
     *     summary="Store Todo",
     *     description="-",
     *     operationId="todo/store",
     *     @OA\RequestBody(
     *          required=true,
     *          description="form todo",
     *          @OA\JsonContent(
     *              required={"title"},
     *              @OA\Property(property="title", type="string"),
     *              @OA\Property(property="description", type="string"),
     *          ),
     *      ),
     *     @OA\Response(
     *         response="default",
     *         description=""
     *     )
     * )
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
     * @OA\Get(
     *     path="/api/todo/{id}",
     *     tags={"Todo"},
     *     summary="Detail",
     *     description="-",
     *     operationId="todo/show",
     *     @OA\Parameter(
     *          name="id",
     *          description="ID Enkripsi",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="string"
     *          )
     *     ),
     *     @OA\Response(
     *         response="default",
     *         description="return model todo"
     *     )
     * )
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
     * @OA\Put(
     *     path="/api/todo/{id}",
     *     tags={"Todo"},
     *     summary="Update todo",
     *     description="-",
     *     operationId="todo/update",
     *     @OA\Parameter(
     *          name="id",
     *          description="ID Enkripsi",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="string"
     *          )
     *     ),
     *     @OA\RequestBody(
     *          required=true,
     *          description="form todo",
     *          @OA\JsonContent(
     *              required={"title"},
     *              @OA\Property(property="title", type="string"),
     *              @OA\Property(property="description", type="string"),
     *          ),
     *      ),
     *     @OA\Response(
     *         response="default",
     *         description=""
     *     )
     * )
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
     * @OA\Delete(
     *     path="/api/todo/{id}",
     *     tags={"Todo"},
     *     summary="Delete todo",
     *     description="-",
     *     operationId="todo/delete",
     *     @OA\Parameter(
     *          name="id",
     *          description="ID Enkripsi",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="string"
     *          )
     *     ),
     *     @OA\Response(
     *         response="default",
     *         description=""
     *     )
     * )
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
