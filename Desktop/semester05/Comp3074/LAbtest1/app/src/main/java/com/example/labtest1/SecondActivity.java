package com.example.labtest1;

import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import java.util.ArrayList;

public class SecondActivity extends AppCompatActivity {
    private ArrayList<String> itemList;
    private ArrayAdapter<String> adapter;
    private TextView selectedItemLabel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_second);

        itemList = new ArrayList<>();
        adapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, itemList);

        ListView itemListView = findViewById(R.id.itemListView);
        itemListView.setAdapter(adapter);

        EditText itemEditText = findViewById(R.id.itemEditText);
        Button addButton = findViewById(R.id.addButton);
        selectedItemLabel = findViewById(R.id.selectedItemLabel);

        addButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String item = itemEditText.getText().toString();
                if (!item.isEmpty()) {
                    itemList.add(item);
                    adapter.notifyDataSetChanged();
                    itemEditText.setText("");
                } else {
                    Toast.makeText(SecondActivity.this, "Please enter an item", Toast.LENGTH_SHORT).show();
                }
            }
        });

        itemListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                String selectedItem = itemList.get(position);
                selectedItemLabel.setText("Selected Item: " + selectedItem);
            }
        });
    }
}
