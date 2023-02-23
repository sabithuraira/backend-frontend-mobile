package com.dev.kotlinapp

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.Navigation
import androidx.navigation.fragment.findNavController
import com.dev.kotlinapp.databinding.FragmentSecondBinding
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONObject
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

/**
 * A simple [Fragment] subclass as the second destination in the navigation.
 */
class SecondFragment : Fragment() {

    private var _binding: FragmentSecondBinding? = null
    private var id_data: Int = 0
    private var title: String = ""
    private var description: String = ""

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        _binding = FragmentSecondBinding.inflate(inflater, container, false)
        return binding.root

    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        id_data = SecondFragmentArgs.fromBundle(arguments as Bundle).dataId
        title = SecondFragmentArgs.fromBundle(arguments as Bundle).title
        description = SecondFragmentArgs.fromBundle(arguments as Bundle).description

        binding.edtTitle.setText(title)
        binding.edtDescription.setText(description)

        if(id_data==0){
            binding.btnDelete.visibility = View.GONE
        }

        binding.btnSubmit.setOnClickListener {
//            findNavController().navigate(R.id.action_SecondFragment_to_FirstFragment)
            saveData(view)
        }

        binding.btnDelete.setOnClickListener {
            deleteData(view)
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    private fun saveData(view: View){
        val jsonObject = JSONObject()
        jsonObject.put("title", binding.edtTitle.text.toString())
        jsonObject.put("description", binding.edtDescription.text.toString())

        val jsonObjectToString = jsonObject.toString()
        val requestBody = jsonObjectToString.toRequestBody("application/json".toMediaType())


        /////
        if(id_data==0){//STORE
            val client = ApiConfig.getApiService().storeTodo(requestBody)
            client.enqueue(object: Callback<Todo> {
                override fun onFailure(call: Call<Todo>, t: Throwable) {
                    Log.e("error", t.message!!)
                }

                override fun onResponse(call: Call<Todo>, response: Response<Todo>) {
                    val destinationFragment = SecondFragmentDirections.actionSecondFragmentToFirstFragment()
                    Navigation.findNavController(view).navigate(destinationFragment)
                }
            })
        }
        else{ //UPDATE
            val client = ApiConfig.getApiService().updateTodo(id_data.toString(), requestBody)
            client.enqueue(object: Callback<String> {
                override fun onFailure(call: Call<String>, t: Throwable) {
                    Log.e("error", t.message!!)
                }

                override fun onResponse(call: Call<String>, response: Response<String>) {
                    val destinationFragment = SecondFragmentDirections.actionSecondFragmentToFirstFragment()
                    Navigation.findNavController(view).navigate(destinationFragment)
                }
            })
        }
        ///
    }

    private fun deleteData(view: View){
        val client = ApiConfig.getApiService().deleteTodo(id_data.toString())
        client.enqueue(object: Callback<String> {
            override fun onFailure(call: Call<String>, t: Throwable) {
                Log.e("error", t.message!!)
            }

            override fun onResponse(call: Call<String>, response: Response<String>) {
                val destinationFragment = SecondFragmentDirections.actionSecondFragmentToFirstFragment()
                Navigation.findNavController(view).navigate(destinationFragment)
            }
        })
    }
}