<template>
  <nav class="uk-navbar-container uk-margin-large-bottom" uk-navbar>
    <div class="uk-navbar-center">

      <div class="uk-navbar-center-left">
        <div>
          <ul class="uk-navbar-nav">
            <li><a href="#">Записаться</a></li>
            <li>
              <a href="#">Контакты</a>
              <div class="uk-navbar-dropdown">
                <ul class="uk-nav uk-navbar-dropdown-nav">
                  <li><a uk-icon="icon: receiver" href="#">8(3513)52-77-85</a></li>
                  <li><a uk-icon="icon: receiver" href="#">8(3513)53-22-65</a></li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <a class="uk-navbar-item uk-logo" href="#">
        <img src="@/images/logo.png" alt="None">
      </a>
      <div class="uk-navbar-center-right">
        <div>
          <ul class="uk-navbar-nav">
            <li><a href="#">Войти</a></li>
            <li><a href="#">Кабинет</a></li>
            <li><a href="#">Выйти</a></li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'y-header'
}
</script>

<style>

</style>