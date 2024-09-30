import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import avatarPic from "@/assets/profile_pic.jpeg";
import { format } from "date-fns";

interface AuthorAvatarProps {
  publishDate: Date;
}

export function Author({ publishDate }: AuthorAvatarProps) {
  return (
    <div className="flex items-center space-x-4 my-4">
      <Avatar>
        <img
          src={avatarPic.src}
          width={avatarPic.width}
          height={avatarPic.height}
          alt={"André Izarra Profile Picture"}
        />
        <AvatarFallback>AI</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-lg leading-none font-bold">André Izarra</p>
        <time
          dateTime={publishDate.toISOString()}
          className="text-muted-foreground"
        >
          Posted on {format(publishDate, "dd/MM/yyyy")}
        </time>
      </div>
    </div>
  );
}
