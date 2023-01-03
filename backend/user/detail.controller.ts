import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { user } from "@prisma/client";
import { GetUser } from "decorator";
import { JwtGuard } from "guard/jwt.guard";
import { EditUserDto } from "./dto";
import { UserService } from "./detail.service";
import { PayDto } from "dto/pay.dto";
import { AuthDto } from "dto/auth.dto";

@UseGuards(JwtGuard)
@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @Post("addgame")
  addGame(@GetUser() userId: any, @Body("game") game_id: number) {
    return this.userService.AddGame(userId, game_id);
  }

  @Post("addtransaction")
  transaction(
    @GetUser() userId: any,
    @Body("game") game_id: number,
    @Body("pay_id") payment_method: string,
  ) {
    return this.userService.addTransaction(userId.id, game_id, payment_method);
  }

  @Post("addpaymentmethod")
  addPaymentMethod(
    @GetUser() user: any,
    @Body("card") card: string,
    @Body("exp") exp: string,
    @Body("description") description: string,
  ) {
    return this.userService.addPaymentMethod(user, card, exp, description);
  }

  @Post("addcart")
  addCart(@GetUser() user: any, @Body("game") game: number) {
    return this.userService.addToCart(user.id, game);
  }

  @Post("review")
  addReview(
    @GetUser() user: any,
    @Body("game") game: number,
    @Body("rating") rating: number,
    @Body("comment") comment: string,
  ) {
    return this.userService.addRating(user.id, game, rating, comment);
  }

  @Get("allreviews")
  getAllReviews(@GetUser() user: any) {
    return this.userService.getRatings(user.id);
  }

  @Delete("deletereview")
  removeReview(@GetUser() user: any, @Body("game") game: number) {
    return this.userService.removeRating(user.id, game);
  }

  @Delete("removecart")
  removeCart(@GetUser() user: any, @Body("game") game: number) {
    return this.userService.removeFromCart(user.id, game);
  }

  @Delete("removegame")
  removeGame(@GetUser() userId: any, @Body("game") game_id: number) {
    return this.userService.removeGame(userId, game_id);
  }

  @Get("cart")
  getCart(@GetUser() user: any) {
    return this.userService.getCart(user.id);
  }

  @Get("me")
  getMe(@GetUser() user: user) {
    return user;
  }

  @Get("games")
  getGames(@GetUser() userId: any) {
    return this.userService.getGames(userId.id);
  }

  @Patch("update")
  editUser(
    @GetUser() userId: any,
    @Body("name") user: string,
    @Body("password") password: string,
  ) {
    return this.userService.editUser(userId.id, user, password);
  }

  @Get("paymentmethods")
  getPaymentMethods(@GetUser() user: any) {
    return this.userService.getPaymentMethods(user.id);
  }

  @Get("transactions")
  getTransactions(@GetUser() user: any) {
    return this.userService.getTransactions(user.id);
  }

  @Get("friendlist")
  getFriendList(@GetUser() user: any) {
    return this.userService.getFriendList(user);
  }

  @Get("friendrequest")
  getFriendRequest(@GetUser() user: any) {
    return this.userService.getFriendRequest(user);
  }
}
