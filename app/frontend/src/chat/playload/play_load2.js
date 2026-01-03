export default function Play_load2(current_id,id,message,type){
    const sent_msg = {
            sender_id: current_id,
            receiver_id: id,
            message: message,
            type: type,
            created_at: "Now"
          }
          return sent_msg;
}