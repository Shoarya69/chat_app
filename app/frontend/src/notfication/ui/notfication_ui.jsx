import { useState } from "react"

import { UserPlus, Check, X, Users } from "lucide-react"
import { toast } from "sonner"

import { Button } from "./button"
import { ScrollArea } from "./scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avtar"
import { Badge } from "./badge"
import { Card, CardContent } from "./card"
import { Link } from "react-router-dom"

import Accept_api from "../api_utlisis/Accept_reject_api"

export function NotificationTab({friendRequests, setFriendRequests,accpet,setAccept}) {
  // const [friendRequests, setFriendRequests] = useState(friendRequest)
  
  const handleAccept = async(id, username) => {
    setAccept(true)
    const tok = localStorage.getItem("token")
    const res = await Accept_api(tok,id,username,true);
    if(res.success){
      setFriendRequests(prev => prev.filter(req => req.id !== id))
      toast.success(`You are now friends with ${username}!`)
      return;
    }
    else if(res.error){
      toast.error(res.error);
    }
    else{
      toast.error("Somting went wrong");
    }
    
  }

  const handleDecline = (id, username) => {
    setAccept(!true)
    setFriendRequests(prev => prev.filter(req => req.id !== id))
    toast.info(`Friend request from ${username} declined`)
  }

  const getInitials = username => {
    return username
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-1">Notifications</h1>
            <p className="text-muted-foreground">Manage your friend requests</p>
          </div>
          {friendRequests.length > 0 && (
            <Badge variant="secondary" className="px-3 py-1">
              {friendRequests.length} new
            </Badge>
          )}
        </div>
      </div>

      {/* Notification List */}
      <ScrollArea className="flex-1">
        <div className="p-6">
          {friendRequests.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="rounded-full bg-muted p-4 mb-4">
                  <Users className="size-8 text-muted-foreground" />
                </div>
                <h3 className="mb-2">No friend requests</h3>
                <p className="text-muted-foreground text-center max-w-sm">
                  You're all caught up! When someone sends you a friend request,
                  it will appear here.
                </p>
              </CardContent>
            </Card>
          ) : (
           
                <div className="space-y-3">
              {friendRequests.map(request => (
                <Card
                  key={request.id}
                  className="overflow-hidden transition-all hover:shadow-md"
                >
                   
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <Link to={`/home/search/user/${request.id}`} >
                      <Avatar className="size-12 border-2 border-muted bg-gray-500">
                        <AvatarImage src={request.avatar} alt={request.username
} />
                        <AvatarFallback>
                          {getInitials(request.username
)}
                        </AvatarFallback>
                      </Avatar>
                      </Link>
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="flex-1 min-w-0">
                            <h4 className="truncate">{request.username
}</h4>
                            <p className="text-muted-foreground text-sm">
                              {request.userusername
}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground shrink-0">
                            <UserPlus className="size-3.5" />
                            <span className="text-xs">{request.timestamp}</span>
                          </div>
                        </div>
                        
                        {/* Mutual Friends */}
                        {request.mutualFriends > 0 && (
                          <div className="flex items-center gap-1.5 text-muted-foreground mb-3">
                            <Users className="size-3.5" />
                            <span className="text-sm">
                              {request.mutualFriends} mutual friend
                              {request.mutualFriends !== 1 ? "s" : ""}
                            </span>
                          </div>
                        )}
                        
                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() =>
                              handleAccept(request.id, request.username
)
                            }
                            className="flex-1"
                          >
                            <Check className="size-4 mr-1.5" />
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleDecline(request.id, request.username
)
                            }
                            className="flex-1"
                          >
                            <X className="size-4 mr-1.5" />
                            Decline
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            

          )}
        </div>
      </ScrollArea>
    </div>
  )
}
