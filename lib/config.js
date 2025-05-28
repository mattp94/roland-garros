import Conf from "conf";

import pkg from "../package.json" with { type: "json" };

export default new Conf({ projectName: pkg.name });
