import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import authorPhoto from "@/assets/andre-izarra.jpg";

type AuthorAvatarProps = {
  postedString: string;
};

export function Author({ postedString }: AuthorAvatarProps) {
  return (
    <div className="my-6 flex items-center gap-4">
      <Avatar>
        <img
          src={authorPhoto.src}
          width="800"
          height="800"
          alt="André Izarra, software developer"
          className="ring-1 ring-border"
        />
        <AvatarFallback>AI</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-display text-lg leading-none font-bold">
          André Izarra
        </p>
        <time className="text-muted-foreground font-mono text-xs tracking-[0.12em] uppercase">
          {postedString}
        </time>
      </div>
    </div>
  );
}
