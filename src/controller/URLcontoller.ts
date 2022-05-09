import { Request, Response } from "express";
import { URLmodel } from "../model/URL";
import shortId from "shortid";
import { config } from "../config/Constants";

export class URLcontroller {
  public async shorten(req: Request, res: Response): Promise<void> {
    const { originURL } = req.body;
    const url = await URLmodel.findOne({ originURL });
    if (url) {
      res.json({ url });
      return;
    }
    const hash = shortId.generate();
    const shortURL = `${config.API_URL}/${hash}`;
    const newUrl = await URLmodel.create({ hash, shortURL, originURL });
    res.json({ newUrl });
  }

  public async redirect(req: Request, res: Response): Promise<void> {
    const { hash } = req.params;

    const url = await URLmodel.findOne({ hash });
    if (url) {
      res.redirect(url.originURL);
      return;
    }
    res.status(400).json({ error: "URL not found" });
  }
}
