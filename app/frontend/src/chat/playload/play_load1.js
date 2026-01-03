export default function Play_load1(current_id,id,message){
    const sent_msg = {
            sender_id: current_id,
            receiver_id: id,
            message: message,
            type: "text",
            created_at: "Now"
          }
          return sent_msg;
}