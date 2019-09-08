document.getElementById("submitbtn").addEventListener("click", function(e) {

    e.preventDefault();

    console.log("Going to post")
    var reservation_info={};
    
    reservation_info.customerName= document.getElementById("reserve_name").value;
   reservation_info.customerPhone = document.getElementById("reserve_contact").value;
   reservation_info.customerEmail = document.getElementById("reserve_email").value;
   reservation_info.customerId= document.getElementById("reserve_id").value;

   $.post("/api/reserve",reservation_info).then(function(data){
       console.log(data);
   });
});
