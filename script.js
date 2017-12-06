//javascript ready function, so that everything is loaded before running the code
$(function(){
    //get products
    $('#getProducts').on('click',function(){
        $.ajax({
            url:'/products',
            contentType:'application/json',
            success:function(response){
                var tbodyEl=$('#getElements');

                tbodyEl.html('');

                response.products.forEach(function(product){
                    tbodyEl.append('\
                    <tr>\
                    <td class="id">'+product.id+'</td>\
                    <td> <input type="text" class="productName" value="'+product.name+'"></td>\
                    <td> <button class="updateBtn">Update/Put product</button>\
                    <button class="deleteBtn">Delete product</button>\
                    </td>\
                    </tr>\
                    ');
                });
            }
        });
    });

    //Create/post
    $('#createProductForm').on('submit',function(event){
        event.preventDefault();
        var createInput=$('#createInput');
        $.ajax({
            url:'/products',
            method:'POST',
            contentType:'application/json',
            data:JSON.stringify({   //to send the data to the server
                name: createInput.val()
            }),
            success:function(response){
                console.log(response);
                createInput.val('');
                $('#getProducts').click();
            }
        })

    });

    //UPDATE/ PUT
    $('table').on('click','.updateBtn',function(){
        var rowEl=$(this).closest('tr');//this->to access the html element that is being retrieved
        var id=rowEl.find('.id').text();
        var updatedProduct=rowEl.find('.productName').val();
        $.ajax({
            url:'/products/' + id,
            method:'PUT',
            contentType:'application/json',
            data:JSON.stringify({   //to send the data to the server
                newName: updatedProduct
            }),
            success:function(response){
                console.log(response);
                
                $('#getProducts').click();

            }
        });
    });  
    
    //DELETE
    $('table').on('click','.deleteBtn',function(){
        var rowEle=$(this).closest('tr');
        var id=rowEle.find('.id').text();
        $.ajax({
            url:'/products/' + id,
            method:'DELETE',
            contentType:'application/json',
            success:function(response){
                console.log(response);
                $('#getProducts').click();
            }
        });

    });
    






});