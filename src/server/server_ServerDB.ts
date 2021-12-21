//UNUSED - ONLY TO REFERENCE DB STRUCTURE
export class ServerDB {
	//////////////////// USERS /////////////////////////
	static Users_C = class {
		static UserID = "userID";
		static Name = "name";
		static Discriminator = "discriminator";
		static DisplayName = "displayName";
	}
	static Users = "users";

	//////////////////// PINS AND ARCHIVE /////////////////////////
	static Pins_C = class {
		static ChannelID = "channelID";
	}
	static Pins = "toBePinned";	
	static Archive = "archive"; //Archive shares Pins_C with Pins

	//////////////////// ROLES /////////////////////////
	static Roles_C = class {
		static UserID = "userID";
		static Role = "role";
	}
	static Roles = "roles";

	//////////////////// HOSTS /////////////////////////
	static Hosts_C = class {
		static URL = "url";
	}
	static Hosts = "hosts";

	//////////////////// ATTRIBUTES /////////////////////////
	static Attributes_C = class {
		static UserID = "userID";
		static Name = "name";
		static Value = "value";
	}
	static Attributes = "attributes";


}