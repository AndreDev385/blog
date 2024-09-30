const avatarPic = new Proxy({"src":"/_astro/profile_pic.twfOzP7P.jpeg","width":1080,"height":1080,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/andre/personal/blog/src/assets/profile_pic.jpeg";
							}
							
							return target[name];
						}
					});

export { avatarPic as a };
