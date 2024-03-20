import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TokenService } from './token.service'
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.query.token || request.body.token
    // 白名单
    if(this.includesBlankUrl(request.url)) {
      return true
    }
    return Observable.create(observer => {
      this.tokenService.checkToken(token).then((hasToken: boolean) => {
        observer.next(hasToken);
        observer.complete();
      });
    }).pipe(map(hasToken => !!hasToken));

  }

  private blankUrlList: Array<string> = [
    '/user/login'
  ]

  private includesBlankUrl(url: string): boolean {
    return this.blankUrlList.includes(url)
  }
}
