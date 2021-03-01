import { puzzleService, websiteService } from "@/utils/request";

export function getUserAnnualReport(userId) {
  if (!userId) return Promise.reject("params error");
  return websiteService({
    url: "/user/annual_report",
    method: "get",
    params: {
      userId
    }
  });
}

export function getSTSToken() {
  return puzzleService({
    url: "/config/stsToken",
    method: "get"
  });
}

export function getAvatar(userId) {
  if (!userId) return Promise.reject("params error");
  return puzzleService({
    url: "/store/h5/sendAvatar",
    method: "post",
    data: {
      userId
    }
  });
}